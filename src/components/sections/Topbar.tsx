import type { SiteSettings } from '@/lib/types';

export function Topbar({ settings }: { settings: SiteSettings }) {
  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar__group">
          <span>Chambers: {settings.hours}</span>
          <span className="topbar__sep">|</span>
          <span>{settings.hoursNote}</span>
        </div>
        <div className="topbar__group">
          <span className="ml" lang="ml">
            {settings.taglineMl}
          </span>
          <span className="topbar__sep">|</span>
          <a href={settings.phone.href}>{settings.phone.display}</a>
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
        </div>
      </div>
    </div>
  );
}
