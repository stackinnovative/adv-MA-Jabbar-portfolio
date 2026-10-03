import Link from 'next/link';
import { DisclaimerLink } from '@/components/Disclaimer';
import { SHOW_FOOTER_DISCLAIMER } from '@/lib/disclaimer';
import type { Disclaimer, SiteSettings } from '@/lib/types';

export function Footer({ settings, disclaimer }: { settings: SiteSettings; disclaimer: Disclaimer }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <div className="footer__name">{settings.name}</div>
            <div className="footer__role">{settings.role}</div>
            <div className="ml" lang="ml">
              {settings.taglineMl}
            </div>
          </div>
          <div className="footer__cols">
            <div>
              <h4>Site</h4>
              <a href="#about">About</a>
              <a href="#practice">Practice</a>
              <a href="#panels">Panels</a>
              <a href="#contact">Contact</a>
            </div>
            <div>
              <h4>Legal</h4>
              <DisclaimerLink />
              <Link href="/privacy">Privacy Policy</Link>
            </div>
            <div>
              <h4>Chambers</h4>
              {settings.offices.map((o) => (
                <address className="footer__office" key={o.label}>
                  {o.footerLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              ))}
              {settings.phones.map((p) => (
                <a key={p.href} href={p.href}>
                  {p.display}
                </a>
              ))}
              {settings.emails.map((e) => (
                <a key={e} href={`mailto:${e}`}>
                  {e}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Footer disclaimer (BCI Rule 36) — on/off via SHOW_FOOTER_DISCLAIMER. */}
        {SHOW_FOOTER_DISCLAIMER && (
          <div className="footer__legal">
            <strong>Disclaimer:</strong> {disclaimer.footerText}
          </div>
        )}
        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {settings.name.replace(/\.$/, '')}. All rights reserved.
          </span>
          <span>Enrolment No. {settings.enrolmentNo} · Bar Council of Kerala</span>
        </div>
      </div>
    </footer>
  );
}
