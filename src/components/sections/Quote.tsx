import Image from 'next/image';
import type { QuoteBlock } from '@/lib/types';

type Props = {
  quote: QuoteBlock;
  /** Accessible name for the section. */
  label: string;
  /** Photo on the right instead of the left (desktop). */
  reverse?: boolean;
};

export function Quote({ quote, label, reverse = false }: Props) {
  return (
    <section className={reverse ? 'quote quote--reverse' : 'quote'} aria-label={label}>
      <div className="container quote__inner">
        {quote.image.src && (
          <div className="quote__photo">
            <Image
              src={quote.image.src}
              alt={quote.image.alt}
              width={quote.image.width}
              height={quote.image.height}
              style={{ objectPosition: quote.image.position }}
              sizes="(max-width: 900px) 200px, 340px"
            />
          </div>
        )}
        <blockquote>
          <svg width="44" height="34" viewBox="0 0 44 34" fill="none" stroke="#E9C9A0" strokeWidth="1.5" aria-hidden="true">
            <path d="M18 2C8 6 2 13 2 22c0 6 4 10 9 10s8-4 8-8-3-8-8-8c-1 0-2 0-3 1 1-5 5-9 11-12M42 2c-10 4-16 11-16 20 0 6 4 10 9 10s8-4 8-8-3-8-8-8c-1 0-2 0-3 1 1-5 5-9 11-12" />
          </svg>
          <p>{quote.text}</p>
          <cite>— {quote.attribution}</cite>
        </blockquote>
      </div>
    </section>
  );
}
