'use client';

import { useRef } from 'react';
import type { HomePage, Role } from '@/lib/types';
import { PauseToggle } from './PauseToggle';
import { RichLine } from './RichLine';
import { useAutoRotate } from './useAutoRotate';

/** Longer than the hero: each panel has a summary, a list and facts to read. */
const INTERVAL_MS = 8000;

const num = (i: number) => String(i + 1).padStart(2, '0');

/** About section: one tab per role with a detailed panel — auto-rotating (see useAutoRotate). */
export function RoleTabs({ roles }: { roles: HomePage['about']['roles'] }) {
  const items = roles.items;
  const rotate = useAutoRotate<HTMLDivElement>(items.length, INTERVAL_MS);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  if (items.length === 0) return null;
  const index = rotate.selected;

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next: number | undefined;
    if (e.key in keys) next = (i + keys[e.key] + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    if (next === undefined) return;
    e.preventDefault();
    rotate.setSelected(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <>
      <div className="roles__head">
        <div className="roles__title">
          <div className="eyebrow">{roles.eyebrow}</div>
          <h3>
            <RichLine text={roles.heading} />
          </h3>
        </div>
        {!rotate.reducedMotion && items.length > 1 && (
          <PauseToggle className="roles__toggle" paused={rotate.userPaused} onToggle={rotate.togglePause} label="roles" showText />
        )}
      </div>

      <div className="roles__body" {...rotate.containerProps}>
        <div className="roles__tabs" role="tablist" aria-label="Roles" aria-orientation="vertical">
          {items.map((r, i) => (
            <button
              key={r.title}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`role-tab-${i}`}
              className="roles__tab"
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls="role-panel"
              tabIndex={i === index ? 0 : -1}
              onClick={() => rotate.setSelected(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <span className="roles__tab-num" aria-hidden="true">
                {num(i)}
              </span>
              <span className="roles__tab-title">{r.title}</span>
              {r.subtitle && <span className="roles__tab-sub">{r.subtitle}</span>}
              {i === index && rotate.running && (
                <span className="roles__progress" aria-hidden="true">
                  <span key={rotate.progressKey} style={{ animationDuration: `${INTERVAL_MS}ms` }} />
                </span>
              )}
            </button>
          ))}
        </div>

        {/* All panels share one grid cell, so the block keeps the height of the
            longest role and the page doesn't jump while rotating. */}
        <div className="roles__stack">
          {items.map((r, i) =>
            i === index ? (
              <div className="roles__panel" id="role-panel" role="tabpanel" aria-labelledby={`role-tab-${i}`} key={`on-${i}`}>
                <RolePanel role={r} index={i} />
              </div>
            ) : (
              <div className="roles__panel is-ghost" aria-hidden="true" key={`ghost-${i}`}>
                <RolePanel role={r} index={i} />
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
}

function RolePanel({ role, index }: { role: Role; index: number }) {
  return (
    <>
      <div className="roles__panel-head">
        <span className="roles__panel-num" aria-hidden="true">
          {num(index)}
        </span>
        <h4>{role.title}</h4>
      </div>
      {role.summary && <p className="roles__summary">{role.summary}</p>}
      <div className="roles__cols">
        {role.points.length > 0 && (
          <ul className="roles__points">
            {role.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
        {role.facts.length > 0 && (
          <dl className="facts roles__facts">
            {role.facts.map((f) => (
              <div className="fact" key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </>
  );
}
