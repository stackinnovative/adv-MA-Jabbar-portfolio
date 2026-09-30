/** Gold 3-stripe kasavu band — the Kerala theme motif. */
export function Kasavu({ dark = false }: { dark?: boolean }) {
  return (
    <div className={dark ? 'kasavu kasavu--dark' : 'kasavu'} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}
