'use client';

import { useEffect, useRef, useState } from 'react';
import { DISCLAIMER_KEY } from '@/lib/disclaimer';
import type { Disclaimer as DisclaimerContent } from '@/lib/types';

/* Entry disclaimer (BCI Rule 36) — must show on first visit. Do not remove. */

const OPEN_EVENT = 'open-disclaimer';

export function openDisclaimer() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function Disclaimer({ name, content }: { name: string; content: DisclaimerContent }) {
  const [open, setOpen] = useState(false);
  const agreeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (document.documentElement.dataset.disclaimer === 'pending') setOpen(true);
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) agreeRef.current?.focus();
  }, [open]);

  function agree() {
    try {
      localStorage.setItem(DISCLAIMER_KEY, '1');
    } catch {}
    document.documentElement.dataset.disclaimer = 'agreed';
    setOpen(false);
  }

  return (
    <div
      className={`disclaimer${open ? ' is-open' : ''}`}
      id="disclaimer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
    >
      <div className="disclaimer__box">
        <div className="disclaimer__stripe" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="disclaimer__body">
          <div className="eyebrow">{name} · Advocate, Mediator &amp; Arbitrator</div>
          <h2 id="disclaimer-title">Disclaimer</h2>
          <div className="disclaimer__text">
            <p>{content.intro}</p>
            <ul>
              {content.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="disclaimer__actions">
            <a className="btn btn--outline" href="https://www.google.com">
              Leave site
            </a>
            <button ref={agreeRef} className="btn btn--primary" type="button" onClick={agree}>
              I agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DisclaimerLink() {
  return (
    <a
      href="#disclaimer"
      onClick={(e) => {
        e.preventDefault();
        openDisclaimer();
      }}
    >
      Disclaimer
    </a>
  );
}
