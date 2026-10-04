'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  heading: string;
  matterOptions: string[];
  consentText: string;
  /**
   * Optional external form service (Formspree / Web3Forms). Empty = use the site's
   * own /api/enquiry route, which sends the email through Resend.
   */
  endpoint: string;
  /** Inbox for enquiries; used for the email-app fallback if sending fails. */
  enquiryEmail: string;
};

/** Opens the visitor's email app with the enquiry pre-filled. */
function openEmailDraft(to: string, data: FormData) {
  const field = (k: string) => String(data.get(k) ?? '').trim();
  const subject = `Website enquiry: ${field('matter') || 'General'} — ${field('name')}`;
  const body = [
    `Name: ${field('name')}`,
    `Phone: ${field('phone')}`,
    `Email: ${field('email') || '—'}`,
    `Type of matter: ${field('matter')}`,
    '',
    field('message'),
  ].join('\n');
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function EnquiryForm({ heading, matterOptions, consentText, endpoint, enquiryEmail }: Props) {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function send(data: FormData): Promise<boolean> {
    if (endpoint) {
      const res = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: data });
      return res.ok;
    }
    const field = (k: string) => String(data.get(k) ?? '');
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: field('name'),
        phone: field('phone'),
        email: field('email'),
        matter: field('matter'),
        message: field('message'),
        consent: data.get('consent') !== null,
        company: field('company'), // spam trap
        startedAt: startedAt.current,
      }),
    });
    return res.ok;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!String(data.get('name') ?? '').trim() || !String(data.get('phone') ?? '').trim()) {
      setStatus('Please enter your name and phone number.');
      return;
    }
    if (!data.get('consent')) {
      setStatus('Please tick the box to confirm you have read the note.');
      return;
    }
    setSending(true);
    setStatus('Sending…');
    let sent = false;
    try {
      sent = await send(data);
    } catch {
      sent = false;
    }
    setSending(false);
    if (sent) {
      form.reset();
      startedAt.current = Date.now();
      setStatus('Thank you. Your enquiry has been sent and the chambers will contact you soon.');
      return;
    }
    // Sending not set up yet or failed: hand the enquiry to the visitor's email app instead.
    openEmailDraft(enquiryEmail, data);
    setStatus('Your email app should open with the enquiry ready to send. If it does not, please call the chambers.');
  }

  return (
    <form className="form" id="enquiry" noValidate onSubmit={onSubmit}>
      <h3>{heading}</h3>
      <div className="form__row">
        <label className="field">
          Full name
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label className="field">
          Phone
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" required />
        </label>
        <label className="field">
          Email
          <input name="email" type="email" autoComplete="email" />
        </label>
        <label className="field">
          Type of matter
          <select name="matter">
            {matterOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="field">
        Brief description
        <textarea name="message" rows={5} />
      </label>
      <label className="check">
        <input type="checkbox" name="consent" required />
        {consentText}
      </label>
      {/* Spam trap: hidden from people, often filled in by bots. */}
      <label className="form__trap" aria-hidden="true">
        Company
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <p className="form__status" role="status" aria-live="polite">
        {status}
      </p>
      <div className="form__foot">
        <button className="btn btn--primary" type="submit" disabled={sending}>
          {sending ? 'Sending…' : 'Send enquiry'}
        </button>
      </div>
    </form>
  );
}
