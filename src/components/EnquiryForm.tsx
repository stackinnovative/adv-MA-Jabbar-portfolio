'use client';

import { useState } from 'react';

type Props = {
  heading: string;
  matterOptions: string[];
  consentText: string;
  /** Formspree / Web3Forms / own API. Set in settings (later: Sanity). */
  endpoint: string;
};

export function EnquiryForm({ heading, matterOptions, consentText, endpoint }: Props) {
  const [status, setStatus] = useState('');

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
    if (!endpoint) {
      setStatus('Form endpoint not set yet (see settings.formEndpoint in src/content/site.ts).');
      return;
    }
    setStatus('Sending…');
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: data });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('Thank you. The chambers will contact you soon.');
    } catch {
      setStatus('Could not send. Please call or email the chambers directly.');
    }
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
      <p className="form__status" role="status" aria-live="polite">
        {status}
      </p>
      <div className="form__foot">
        <button className="btn btn--primary" type="submit">
          Send enquiry
        </button>
      </div>
    </form>
  );
}
