import Image from 'next/image';
import { RichLine } from '@/components/RichLine';
import type { HomePage } from '@/lib/types';

export function Beyond({ beyond }: { beyond: HomePage['beyond'] }) {
  return (
    <section className="section section--ivory">
      <div className="container beyond">
        <div className="beyond__photo">
          <Image
            src={beyond.image.src}
            alt={beyond.image.alt}
            width={beyond.image.width}
            height={beyond.image.height}
            style={{ objectPosition: beyond.image.position }}
            sizes="(max-width: 900px) 100vw, 460px"
          />
        </div>
        <div className="beyond__copy">
          <div className="eyebrow">{beyond.eyebrow}</div>
          <h2 className="h2">
            <RichLine text={beyond.heading} />
          </h2>
          <p>{beyond.body}</p>
          <ul className="timeline">
            {beyond.timeline.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
