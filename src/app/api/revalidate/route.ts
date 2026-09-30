import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { SANITY_TAG } from '@/lib/content';

/**
 * Sanity webhook → refresh the site immediately after "Publish".
 * Set up in sanity.io/manage → API → Webhooks (see README / CLAUDE.md):
 *   URL: https://<site>/api/revalidate   Trigger: create, update, delete
 *   Secret: same value as SANITY_REVALIDATE_SECRET
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ message: 'SANITY_REVALIDATE_SECRET is not set' }, { status: 500 });

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret);
  if (!isValidSignature) return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });

  revalidateTag(SANITY_TAG, 'max');
  return NextResponse.json({ revalidated: true, type: body?._type ?? null, now: Date.now() });
}
