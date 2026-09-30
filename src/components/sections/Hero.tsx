import Image from 'next/image';
import { HeroTabs } from '@/components/HeroTabs';
import { RichLine } from '@/components/RichLine';
import type { HomePage } from '@/lib/types';

export function Hero({ hero }: { hero: HomePage['hero'] }) {
  return (
    <section className="hero" id="home">
      <svg className="hero__art" viewBox="0 0 760 420" fill="none" stroke="#C9A24A" strokeWidth="1.2" aria-hidden="true">
        <path d="M20 140L380 20L740 140Z" />
        <path d="M10 150h740M30 170h700M30 400h700M10 418h740" />
        <path d="M60 170v230M80 170v230M120 170v230M140 170v230M180 170v230M200 170v230M240 170v230M260 170v230M300 170v230M320 170v230M440 170v230M460 170v230M500 170v230M520 170v230M560 170v230M580 170v230M620 170v230M640 170v230M680 170v230M700 170v230" />
        <path d="M345 400V240a35 35 0 0 1 70 0v160" />
        <circle cx="380" cy="95" r="22" />
      </svg>
      <div className="container">
        <div className="hero__copy">
          <div className="hero__kicker">{hero.kicker}</div>
          <h1>
            <RichLine text={hero.heading} />
          </h1>
          <p className="hero__lead">{hero.lead}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#contact">
              Contact the chambers
            </a>
            <a className="btn btn--ghost" href="#practice">
              Areas of practice
            </a>
          </div>
          <HeroTabs items={hero.highlights} />
        </div>

        <div className="hero__photo">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            style={{ objectPosition: hero.image.position }}
            sizes="(max-width: 900px) 420px, 480px"
            priority
          />
          <div className="badge">
            <small>{hero.badge.label}</small>
            <strong>{hero.badge.value}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
