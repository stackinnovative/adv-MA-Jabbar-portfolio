'use client';

import { useEffect, useRef, useState } from 'react';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'practice', label: 'Practice' },
  { id: 'panels', label: 'Panels' },
  { id: 'contact', label: 'Contact' },
];

export function Header({ name, role }: { name: string; role: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const headerRef = useRef<HTMLElement>(null);

  // Expose the header's real height (it grows when the role line wraps on phones)
  // as --header-h, for sticky elements that must sit just below it.
  useEffect(() => {
    const el = headerRef.current;
    if (!el || !('ResizeObserver' in window)) return;
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Highlight the nav link for the section in the middle of the viewport.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <a className="brand" href="#home">
          <span className="brand__mark">
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="#7C5E1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 4v23M10 27h12M6 9h20" />
              <path d="M6 9l-4 9h8zM26 9l-4 9h8z" />
              <path d="M2 18a4 3 0 0 0 8 0M22 18a4 3 0 0 0 8 0" />
            </svg>
          </span>
          <span>
            <span className="brand__name">{name}</span>
            <br />
            <span className="brand__role">{role}</span>
          </span>
        </a>
        <button
          className="menu-btn"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16130F" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="M3 7h18M3 12h18M3 17h18" />
          </svg>
        </button>
        <nav className={`nav${menuOpen ? ' is-open' : ''}`} id="nav" aria-label="Main">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'is-active' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
