import { WhatsAppIcon, whatsappHref } from '@/components/WhatsAppLink';
import type { SiteSettings } from '@/lib/types';

/* Desktop-only bar. On narrower desktops the note and tagline drop out (CSS)
   so the phone numbers and email always fit on one line. */
export function Topbar({ settings }: { settings: SiteSettings }) {
  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar__group">
          <span>Chambers: {settings.hours}</span>
          <span className="topbar__sep topbar__note">|</span>
          <span className="topbar__note">{settings.hoursNote}</span>
        </div>
        <div className="topbar__group">
          <span className="ml topbar__tagline" lang="ml">
            {settings.taglineMl}
          </span>
          <span className="topbar__sep topbar__tagline">|</span>
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
        {/* Phones only (CSS): quick actions under the hours. */}
        <div className="topbar__actions">
          {settings.phones[0] && (
            <a href={settings.phones[0].href} aria-label={`Call ${settings.phones[0].display}`}>
              Call
            </a>
          )}
          <a href={whatsappHref(settings.whatsapp)} target="_blank" rel="noopener noreferrer" aria-label="Enquire on WhatsApp">
            <WhatsAppIcon size={14} /> WhatsApp
          </a>
          <a href="#enquiry" aria-label="Send an enquiry">
            Enquiry
          </a>
        </div>
      </div>
    </div>
  );
}
