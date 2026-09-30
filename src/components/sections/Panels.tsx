import type { HomePage } from '@/lib/types';

export function Panels({ panels }: { panels: HomePage['panels'] }) {
  return (
    <section className="section section--dark" id="panels">
      <div className="container">
        <div className="rule-title">
          <div className="eyebrow eyebrow--gold">{panels.eyebrow}</div>
        </div>
        <ul className="panels">
          {panels.items.map((item, i) => (
            <li key={item}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
