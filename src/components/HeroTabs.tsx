'use client';

import { useRef } from 'react';
import type { Highlight } from '@/lib/types';
import { PauseToggle } from './PauseToggle';
import { useAutoRotate } from './useAutoRotate';

/** Time each highlight stays on screen while auto-rotating. */
const INTERVAL_MS = 5000;

const num = (i: number) => String(i + 1).padStart(2, '0');

/** Hero highlight tabs — auto-rotating (see useAutoRotate). */
export function HeroTabs({ items }: { items: Highlight[] }) {
  const rotate = useAutoRotate<HTMLDivElement>(items.length, INTERVAL_MS);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  if (items.length === 0) return null;
  const index = rotate.selected;
  const current = items[index];

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + items.length) % items.length;
    rotate.setSelected(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="hero__tabs" {...rotate.containerProps}>
      {/* Announce changes only when the visitor drives them, not every 5 s. */}
      <div className="tabcard" id="tab-panel" role="tabpanel" aria-live={rotate.autoplay ? 'off' : 'polite'}>
        <div className="tabcard__num">{num(index)}</div>
        {/* All items share one grid cell, so the card keeps the height of the
            longest one and the page doesn't jump while rotating. */}
        <div className="tabcard__stack">
          {items.map((item, i) =>
            i === index ? (
              <div className="tabcard__body" key={`on-${i}`}>
                <div className="tabcard__title">{current.title}</div>
                <div className="tabcard__text">{current.text}</div>
              </div>
            ) : (
              <div className="tabcard__body is-ghost" key={`ghost-${i}`} aria-hidden="true">
                <div className="tabcard__title">{item.title}</div>
                <div className="tabcard__text">{item.text}</div>
              </div>
            ),
          )}
        </div>
        {rotate.autoplay && (
          <div className="tabcard__progress" aria-hidden="true">
            {rotate.running && <span key={rotate.progressKey} style={{ animationDuration: `${INTERVAL_MS}ms` }} />}
          </div>
        )}
      </div>
      <div className="tabnav">
        <div className="tablist" role="tablist" aria-label="Practice highlights">
          {items.map((item, i) => (
            <button
              key={item.title}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls="tab-panel"
              aria-label={item.title}
              tabIndex={i === index ? 0 : -1}
              onClick={() => rotate.setSelected(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {num(i)}
            </button>
          ))}
        </div>
        {!rotate.reducedMotion && items.length > 1 && (
          <PauseToggle className="tabnav__toggle" paused={rotate.userPaused} onToggle={rotate.togglePause} label="highlights" />
        )}
      </div>
    </div>
  );
}
