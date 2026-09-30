'use client';

type Props = {
  paused: boolean;
  onToggle: () => void;
  /** What is rotating, for the accessible name, e.g. "highlights". */
  label: string;
  className: string;
  /** Show "Pause"/"Play" text next to the icon. */
  showText?: boolean;
};

/** Pause / play button for auto-rotating content (WCAG 2.2.2). */
export function PauseToggle({ paused, onToggle, label, className, showText = false }: Props) {
  const action = paused ? 'Play' : 'Pause';
  return (
    <button type="button" className={className} aria-label={`${action} ${label}`} onClick={onToggle}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
        {paused ? <path d="M3 1.5v11l9-5.5z" /> : <path d="M3 1.5h3v11H3zM8 1.5h3v11H8z" />}
      </svg>
      {showText && <span aria-hidden="true">{action}</span>}
    </button>
  );
}
