import { EnquiryForm } from '@/components/EnquiryForm';
import type { HomePage, SiteSettings } from '@/lib/types';

export function Contact({ contact, settings }: { contact: HomePage['contact']; settings: SiteSettings }) {
  const mailto = `mailto:${settings.email}`;
  return (
    <section className="section" id="contact">
      <div className="container contact">
        <div className="contact__info">
          <div className="eyebrow">{contact.eyebrow}</div>
          <h2 className="h2">{contact.heading}</h2>
          <dl className="contact__list">
            {settings.offices.map((office) => (
              <div key={office.label}>
                <dt>{office.label}</dt>
                <dd>
                  {office.lines.map((l, i) => (
                    <span key={l}>
                      {i > 0 && <br />}
                      {l}
                    </span>
                  ))}
                  <br />
                  <a className="contact__map-link" href={office.mapUrl} target="_blank" rel="noopener noreferrer">
                    Directions on Google Maps
                  </a>
                </dd>
              </div>
            ))}
            <div>
              <dt>Phone &amp; Email</dt>
              <dd>
                <a href={settings.phone.href}>{settings.phone.display}</a>
                <br />
                <a href={mailto}>{settings.email}</a>
              </dd>
            </div>
            <div>
              <dt>Chamber hours</dt>
              <dd>
                {settings.hours}
                <br />
                {settings.hoursNote}
              </dd>
            </div>
          </dl>
          <div className="contact__quick">
            <a className="btn btn--dark" href={settings.phone.href}>
              Call
            </a>
            <a className="btn btn--dark" href={mailto}>
              Email
            </a>
          </div>
          {settings.mapEmbedUrl ? (
            <div className="map">
              <iframe
                src={settings.mapEmbedUrl}
                title={`Map — ${settings.offices[0]?.label ?? 'chamber'}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <div className="map" role="img" aria-label="Map — chamber location (to be added)" />
          )}
        </div>

        <EnquiryForm
          heading={contact.formHeading}
          matterOptions={contact.matterOptions}
          consentText={contact.consentText}
          endpoint={settings.formEndpoint}
        />
      </div>
    </section>
  );
}
