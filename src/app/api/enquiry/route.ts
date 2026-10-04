import { NextResponse, type NextRequest } from 'next/server';
import { Resend } from 'resend';
import { getSiteContent } from '@/lib/content';

/**
 * Enquiry form → email via Resend.
 *
 * Env (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY   required; from resend.com → API Keys
 *   ENQUIRY_FROM     optional; default "Website enquiry <enquiry@advmajabbar.com>"
 *                    (the domain must be verified in Resend)
 * Messages go to settings.enquiryEmail (src/content/site.ts or the CMS).
 *
 * Responses: 200 sent · 400 invalid input · 503 not configured · 502 send failed.
 * On anything but 200 the form falls back to opening the visitor's email app.
 */

export const runtime = 'nodejs';

const MIN_FILL_MS = 3000; // faster than this is almost certainly a bot
const LIMITS = { name: 120, phone: 40, email: 200, matter: 120, message: 5000 };

type Enquiry = { name: string; phone: string; email: string; matter: string; message: string };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Spam traps: a hidden field humans leave empty, and a minimum time on the form.
  const startedAt = Number(body.startedAt);
  if (String(body.company ?? '').trim() || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true }); // pretend success; don't teach bots
  }

  const field = (k: keyof Enquiry) => String(body[k] ?? '').trim().slice(0, LIMITS[k]);
  const enquiry: Enquiry = {
    name: field('name'),
    phone: field('phone'),
    email: field('email'),
    matter: field('matter'),
    message: field('message'),
  };
  if (!enquiry.name || !enquiry.phone || body.consent !== true) {
    return NextResponse.json({ error: 'Name, phone and consent are required' }, { status: 400 });
  }
  const replyTo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email) ? enquiry.email : undefined;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'Email sending is not configured' }, { status: 503 });

  const { settings } = await getSiteContent();
  const from = process.env.ENQUIRY_FROM || 'Website enquiry <enquiry@advmajabbar.com>';
  const subject = `Website enquiry: ${enquiry.matter || 'General'} — ${enquiry.name}`;
  const rows: [string, string][] = [
    ['Name', enquiry.name],
    ['Phone', enquiry.phone],
    ['Email', enquiry.email || '—'],
    ['Type of matter', enquiry.matter || '—'],
  ];
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), '', enquiry.message || '(no description)', '', '— Sent from the enquiry form on the website. The sender confirmed this does not create an advocate–client relationship.'].join('\n');
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
${rows.map(([k, v]) => `<tr><td style="color:#7C5E1C"><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`).join('\n')}
</table>
<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(enquiry.message || '(no description)')}</p>
<p style="font-family:Arial,sans-serif;font-size:12px;color:#5A5147">Sent from the enquiry form on the website. The sender confirmed this does not create an advocate–client relationship.</p>`;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: settings.enquiryEmail,
      replyTo,
      subject,
      text,
      html,
    });
    if (error) throw new Error(`${error.name}: ${error.message}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[enquiry] send failed', err);
    return NextResponse.json({ error: 'Could not send' }, { status: 502 });
  }
}
