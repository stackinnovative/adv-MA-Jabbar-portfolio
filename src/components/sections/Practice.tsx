import { RichLine } from '@/components/RichLine';
import type { HomePage } from '@/lib/types';

const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi'];

export function Practice({ practice }: { practice: HomePage['practice'] }) {
  return (
    <section className="section section--ivory" id="practice">
      <div className="container">
        <div className="section__head">
          <div className="stack">
            <div className="eyebrow">{practice.eyebrow}</div>
            <h2>
              <RichLine text={practice.heading} />
            </h2>
          </div>
          <p>{practice.intro}</p>
        </div>
        <div className="practice">
          {practice.areas.map((a, i) => (
            <article className="practice__item" key={a.title}>
              <div className="practice__num">{ROMAN[i] ?? i + 1}.</div>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
