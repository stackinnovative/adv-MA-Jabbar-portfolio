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
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
        </div>
      </div>
    </div>
  );
}
