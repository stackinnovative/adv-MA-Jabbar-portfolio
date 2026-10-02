import Image from 'next/image';
import { RoleTabs } from '@/components/RoleTabs';
import type { HomePage } from '@/lib/types';

export function About({ about }: { about: HomePage['about'] }) {
  const [first, rest] = [about.name.charAt(0), about.name.slice(1)];
  return (
    <section className="section" id="about">
      <div className="container about">
        <div className="about__main">
          <div className="eyebrow">About</div>
          <div className="about__head">
            <div className="about__name">
              <span className="about__drop" aria-hidden="true">
                {first}
              </span>
              <h2>
                <span className="skip">{first}</span>
                {rest}
              </h2>
            </div>
            <p className="about__sub">{about.subtitle}</p>
          </div>
          <div className="about__bio">
            {about.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <aside className="about__side">
          <div className="portrait">
            <Image
              src={about.portrait.src}
              alt={about.portrait.alt}
              width={about.portrait.width}
              height={about.portrait.height}
              style={{ objectPosition: about.portrait.position }}
              sizes="(max-width: 900px) 100vw, 400px"
            />
          </div>
        </aside>
      </div>

      {about.roles.items.length > 0 && (
        <div className="container roles">
          <RoleTabs roles={about.roles} />
        </div>
      )}
    </section>
  );
}
