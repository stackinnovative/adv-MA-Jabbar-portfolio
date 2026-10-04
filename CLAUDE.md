# Project: Adv. Abdul Jabbarudeen M. — Portfolio Website

Client: advocate, mediator and arbitrator based in Kerala, India.
Built by: StackInnovative.

## Stack
Next.js 16 (App Router) + TypeScript + Sanity CMS (Studio embedded at `/studio`).
- `src/app/(site)/` — the website: `layout.tsx` (fonts, metadata, disclaimer pre-paint script), `page.tsx`, `privacy/`, `globals.css` (design tokens in `:root`)
- `src/app/(studio)/studio/[[...tool]]/` — Sanity Studio (own root layout, so site CSS doesn't leak in)
- `src/app/api/revalidate/route.ts` — Sanity webhook → `revalidateTag('sanity')`
- `src/components/sections/*` — server components, one per section; `src/components/*.tsx` — client parts (menu, tabs, form, modal)
- `src/lib/content.ts` — `getSiteContent()`, the ONLY content reader (Sanity data merged over local defaults)
- `src/lib/merge.ts` — fills empty CMS fields from defaults; image hotspot → CSS object-position
- `src/lib/types.ts` — content model; `src/lib/sanity/{env,client,queries}.ts` — Sanity connection + GROQ
- `src/content/site.ts` — local defaults / fallback / seed data
- `sanity.config.ts`, `sanity.cli.ts`, `sanity/schemaTypes/*`, `sanity/structure.ts` — Studio config; 4 singleton documents with fixed IDs
- `scripts/seed-sanity.ts` — imports local content + photos into Sanity; `scripts/make-images.mjs` — builds all site photos from `source-images/`
- `public/images/` — photos; `_static/` — original plain HTML version (reference only)

Run: `npm run dev` (site at `/`, CMS at `/studio`). Build: `npm run build`. Deploy: Vercel / Netlify / any Node host.
Env vars: see `.env.local.example` (set them on the host too).

## Content rules
- Components never hard-code copy. New field → update `types.ts`, `site.ts`, the Sanity schema and (for images) `queries.ts` together.
- Without `NEXT_PUBLIC_SANITY_PROJECT_ID` the site runs on `src/content/site.ts` alone; if Sanity is unreachable it falls back to it too.
- Heading text supports a newline (line break) and `*word*` (italic) via `RichLine`.
- No fact may appear more than twice on the page (client rule, Oct 2026). Each section has one job:
  hero lead = one-line summary of credentials · hero tabs = kinds of work · About bio = personal (education, approach) ·
  role tabs = what each role involves (no credentials) · Panels = the single credentials list ·
  Social Activist tab = activism · "Public service" (Beyond) = public-service record. Contact details/identity are exempt.
- Content refreshes every 60 s, or instantly via the webhook.

## Sanity setup (one-time)
1. `npx sanity login`, then create a project at sanity.io/manage (dataset `production`, public) and put its ID in `.env.local`.
2. `npx sanity cors add http://localhost:3000 --credentials` (repeat for the production URL).
3. `npm run seed` — uploads photos and creates the 4 documents. `npm run seed -- --replace` overwrites them.
4. Webhook: sanity.io/manage → API → Webhooks → URL `https://<site>/api/revalidate`, POST, trigger create/update/delete, secret = `SANITY_REVALIDATE_SECRET`.
5. Invite the client as an Editor at sanity.io/manage → Members.

## Design rules (keep these)
- Colours: ink `#16130F`, paper `#FBF8F1`, ivory `#F6F1E6`, gold `#C9A24A` (only on dark), dark gold `#7C5E1C` (gold text on light), kasavu `#B08A3E`, maroon `#6B1E28`.
- Fonts: Playfair Display (headings), Source Sans 3 (body), Noto Serif Malayalam (Malayalam tagline).
- The gold 3-stripe `.kasavu` band is the Kerala theme motif. Keep it between hero/about and above the footer.
- Breakpoints: 1200px (tablet), 900px (mobile). Mobile gutter 16px. Touch targets ≥ 44px.
- No emoji, no gradients, no stock "lady justice" clip art.

## Legal rules — DO NOT BREAK (Bar Council of India, Rule 36)
Indian advocates may not advertise or solicit work. The site may only state facts.
- NO testimonials, client reviews, star ratings, case results, win rates or "cases won" counters (and no CMS fields for them).
- NO self-praise words: "best", "top", "leading", "expert", "No. 1", "guaranteed", "rich experience".
- NO pop-ups/CTAs like "Free consultation", "Hire now", "Limited offer".
- NO Ashoka emblem / State Emblem of India / "Satyameva Jayate" (illegal for private use).
- Entry disclaimer modal: the first-visit pop-up is DISABLED at the owner's request (Sept 2026) via
  `SHOW_ENTRY_DISCLAIMER = false` in `src/lib/disclaimer.ts`. Set it to `true` to restore. The modal still opens
  from the footer "Disclaimer" link (agreement stored in localStorage key `ajm_disclaimer_agreed`).
- KEEP the footer disclaimer box (`SHOW_FOOTER_DISCLAIMER = true` in `src/lib/disclaimer.ts`). Wording (client-supplied,
  Oct 2026): "This website is for informational purposes only as per BCI rules. No advertisement or solicitation.
  Emblems/logos of Government of India are not used." The footer "Disclaimer" link (opens the pop-up) also remains.
- KEEP the form consent checkbox.

## Content sources
- Copy is based on the client's CV and notes (Sept 2026).
- Naming: the known name "Adv. M.A. Jabbar" (`settings.name`) is used site-wide — header, footer, titles, quote, disclaimer.
  The full name "Abdul Jabbarudeen M." (`settings.fullName`) appears only in the About section, structured data,
  and alongside the short name in legal text (disclaimer, privacy).
- Two offices: Ernakulam (KHCAA Chamber Complex, High Court) and Punalur (Law Relief, GKP Tower).
- Do NOT publish the residential address (Pattazhy Vadakkekara) — privacy.
- Do NOT add the Govt of India emblem next to the MCA mediator appointment, even if the client asks.
- Photos: originals in `source-images/` (client's studio set, Sept 2026). `node scripts/make-images.mjs` builds
  outputs named `<prefix>-<source>-<content hash>.jpg` (any change gets a new URL — avoids stale image caches):
  - hero ← `portrait-seated-side.jpg` (client's "6.jpeg"; backdrop blended to ink so it sits seamlessly on the dark hero) + `og.jpg`.
    He faces right, so on desktop the hero puts the photo on the LEFT and the text on the right.
    Never mirror/flip portraits — the client rejected it (it changes the face).
  - About portrait ← `portrait-headshot-left.jpg` (client's "1.jpeg"), colour
  - quote band (maroon) ← `portrait-hands-on-hips.jpg` (client's "5.jpeg"), colour
  - "Public service & social engagement" ← `portrait-seated.jpg` (client's "3.jpeg"), black and white
  - second quote band (after Areas of Practice, photo on the right) ← `portrait-headshot-front.jpg` (client's "2.jpeg"), colour
  After running it, copy the printed paths and sizes into `src/content/site.ts`.
  Photos are never cropped (client requirement): outputs keep the original proportions and every photo box
  sizes itself from the image (`height: auto`). Do not reintroduce fixed heights/aspect ratios or object-fit crops.
  A new hero photo uploaded in the Studio must be prepared the same way. Old photos (chambers, Edinburgh, blue-background
  portrait) are no longer used; copies remain in `_static/assets/img/`.

## Placeholders still to fill (search `src/content/site.ts` for `[` and `TODO`)
- Bar Council of Kerala enrolment number `K/[XXXX]/[YEAR]`
- Chamber hours (same for both offices?)
- Exact title of the "Nivaaran" mediator appointment; spelling of "Al Aman" trust
- Privacy policy wording — draft written, needs the advocate's review
- `formEndpoint` (Formspree / Web3Forms / own API route)

## Suggested next tasks
1. Finish Sanity setup (steps above) and invite the client.
2. Enquiry email: the form posts to `src/app/api/enquiry/route.ts`, which sends via **Resend** to
   `settings.enquiryEmail` (vu3jbr@gmail.com) with Reply-To set to the visitor. Needs `RESEND_API_KEY` (and the
   domain advmajabbar.com verified in Resend; sender `ENQUIRY_FROM`). Spam traps: hidden `company` field + 3 s
   minimum. If sending isn't configured or fails, the form opens the visitor's email app instead.
   Public emails shown on the site: `settings.emails` (vu3jbr@gmail.com, then majabbaradv@gmail.com).
3. Add a floating WhatsApp button (`https://wa.me/919447009556`) on mobile.
4. Add `src/app/icon.svg` (scales icon from the header), `robots.ts`, `sitemap.ts`.
5. Lighthouse pass: aim for 95+ on performance and accessibility.
