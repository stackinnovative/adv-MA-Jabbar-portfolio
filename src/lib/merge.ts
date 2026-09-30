type Json = Record<string, unknown>;
const isObject = (v: unknown): v is Json => typeof v === 'object' && v !== null && !Array.isArray(v);

/**
 * Overlays CMS data on the local defaults. Only keys that exist in the
 * defaults are kept, so the result always matches the defaults' type.
 * Arrays from the CMS replace the default arrays; their items are filled
 * with blanks where a field is missing.
 */
export function withDefaults<T>(base: T, over: unknown): T {
  if (over === null || over === undefined) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(over) || over.length === 0) return base;
    const template = base[0];
    return over
      .filter((item) => item !== null && item !== undefined)
      .map((item) => (template === undefined ? item : withDefaults(blank(template), item))) as T;
  }
  if (isObject(base)) {
    if (!isObject(over)) return base;
    const out: Json = {};
    for (const key of Object.keys(base)) out[key] = withDefaults(base[key], over[key]);
    return out as T;
  }
  return (typeof over === typeof base ? over : base) as T;
}

/** Same shape as `v`, with empty values — used as the default for array items. */
function blank<T>(v: T): T {
  if (Array.isArray(v)) return [] as T;
  if (isObject(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)])) as T;
  if (typeof v === 'number') return 0 as T;
  if (typeof v === 'string') return '' as T;
  return v;
}

/** Turns a Sanity image hotspot into a CSS object-position, unless one is set by hand. */
export function withImagePositions(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(withImagePositions);
  if (!isObject(v)) return v;
  const out: Json = {};
  for (const [k, x] of Object.entries(v)) out[k] = withImagePositions(x);
  const hotspot = out.hotspot;
  if ('src' in out && !out.position && isObject(hotspot) && typeof hotspot.x === 'number' && typeof hotspot.y === 'number') {
    out.position = `${Math.round(hotspot.x * 100)}% ${Math.round(hotspot.y * 100)}%`;
  }
  return out;
}
