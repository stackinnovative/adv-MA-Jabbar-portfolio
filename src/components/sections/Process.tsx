import type { HomePage } from '@/lib/types';

export function Process({ process }: { process: HomePage['process'] }) {
  return (
    <section className="section">
      <div className="container">
        <div className="center-head">
          <div className="eyebrow">{process.eyebrow}</div>
          <h2 className="h2">{process.heading}</h2>
        </div>
        <ol className="steps">
          {process.steps.map((s, i) => (
            <li key={s.title}>
              <small>STEP {String(i + 1).padStart(2, '0')}</small>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
