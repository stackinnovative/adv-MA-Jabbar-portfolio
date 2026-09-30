'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Auto-advancing tabs. Rotation runs only while the element is on screen and
 * has no keyboard focus, stops when the visitor presses pause (WCAG 2.2.2), and
 * never runs under prefers-reduced-motion. A manual selection restarts the
 * countdown for that tab.
 */
export function useAutoRotate<T extends HTMLElement>(count: number, intervalMs: number) {
  const [selected, setSelected] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [engaged, setEngaged] = useState(false); // keyboard focus inside
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [runId, setRunId] = useState(0);
  const ref = useRef<T>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Hidden (display: none) or off-screen elements report as not intersecting.
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const autoplay = !userPaused && !reducedMotion && count > 1;
  const running = autoplay && !engaged && inView;

  // New progress-bar run whenever rotation (re)starts.
  useEffect(() => {
    if (running) setRunId((r) => r + 1);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setSelected((s) => (s + 1) % count), intervalMs);
    return () => window.clearTimeout(id);
  }, [running, selected, count, intervalMs]);

  // No pause-on-hover: a resting cursor (or an iOS tap) would stop rotation
  // whenever the section scrolls under it. The pause button covers WCAG 2.2.2;
  // keyboard focus also pauses so tab contents don't change under the reader.
  const containerProps = {
    ref,
    onFocus: (e: React.FocusEvent<T>) => {
      if (e.target.matches(':focus-visible')) setEngaged(true);
    },
    onBlur: (e: React.FocusEvent<T>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setEngaged(false);
    },
  };

  return {
    /** Current index, clamped in case the item count shrinks. */
    selected: count > 0 ? selected % count : 0,
    setSelected,
    autoplay,
    running,
    /** Key for the progress bar so it restarts with each run. */
    progressKey: `${selected}-${runId}`,
    userPaused,
    togglePause: () => setUserPaused((p) => !p),
    reducedMotion,
    containerProps,
  };
}
