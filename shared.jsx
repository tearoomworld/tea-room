// Shared bits used by every landing variant + the full prototype.
// Pink palette, type, marquee, blob/squiggle, arrow link, monospace nav.

const PINK = '#f7d4dc';
const INK  = '#1a1414';      // very deep warm near-black
const RULE = 'rgba(26,20,20,.18)';
const MUTE = 'rgba(26,20,20,.55)';

// Apps — keep in one place so every page reads the same source of truth.
const APPS = [
  {
    slug: 'tea-room',
    title: 'tea room',
    n: '01',
    tag: 'a slow chat with strangers',
    desc: 'a tiny room with three seats. you sit. someone else sits. you steep a pot together while you talk. nobody can leave until the timer finishes brewing.',
    year: '2026',
    color: '#e8b4be',
    medium: ['web', 'realtime', 'sound'],
    accent: '#7a3848',
  },
  {
    slug: 'worry-jar',
    title: 'worry jar',
    n: '02',
    tag: 'put it down for a minute',
    desc: 'write down what is heavy in your chest. close the lid. the jar holds it for you until you decide to open it again. some worries the jar will quietly compost.',
    year: '2026',
    color: '#cdb8e0',
    medium: ['web', 'journaling', 'ambient'],
    accent: '#4a3568',
  },
  {
    slug: 'pocket-garden',
    title: 'pocket garden',
    n: '03',
    tag: 'a plot that grows from your typing',
    desc: 'every key you press waters something. fast typing makes weeds. slow typing makes flowers. open the tab tomorrow to see what your wednesday looked like.',
    year: '2026',
    color: '#bcd9b8',
    medium: ['web', 'ambient', 'typography'],
    accent: '#2f5238',
  },
];

// In-progress / coming soon slots — keeps the marketplace feeling alive.
const SOON = [
  { slug: 'lullaby-machine',   title: 'lullaby machine',   tag: 'sleep loops from your voice notes' },
  { slug: 'index-of-feelings', title: 'index of feelings', tag: 'a private dewey decimal' },
  { slug: 'thumbprint',        title: 'thumbprint',        tag: 'a daily one-tap diary' },
];

// ─── tiny abstract squiggles & blobs ──────────────────────────
// Hand-drawn-ish single-stroke organic shapes. Kept geometrically
// simple — single <path> primitives, no nested decoration.

function Blob({ size = 140, color = INK, variant = 'blob' }) {
  const paths = {
    blob: 'M70 8 C 110 6 132 38 128 70 C 124 105 96 130 64 128 C 28 126 8 100 10 64 C 12 32 36 10 70 8 Z',
    squiggle: 'M6 70 C 26 30 46 110 70 70 C 94 30 114 110 134 70',
    spiral: 'M70 70 m -4 0 a 4 4 0 1 1 8 0 a 12 12 0 1 1 -24 0 a 24 24 0 1 1 48 0 a 36 36 0 1 1 -72 0 a 50 50 0 1 1 100 0',
    loop: 'M30 80 C 30 20 110 20 110 80 C 110 130 30 130 30 80 M 25 70 C 25 110 115 110 115 70',
    wave: 'M8 70 Q 30 30 52 70 T 96 70 T 140 70',
    knot: 'M40 30 C 90 30 90 110 40 110 C 0 110 0 50 50 50 C 100 50 100 110 60 110',
  };
  const stroke = variant === 'blob' ? 'none' : color;
  const fill   = variant === 'blob' ? color : 'none';
  return (
    <svg width={size} height={size} viewBox="0 0 140 140" style={{ display: 'block', overflow: 'visible' }}>
      <path d={paths[variant]} fill={fill} stroke={stroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// A small composition of two overlapping blobs/squiggles — good for the
// "doodle slot" in the reference layout.
function Doodle({ size = 160, color = INK }) {
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <svg viewBox="0 0 160 160" width={size} height={size} style={{ overflow: 'visible' }}>
          <path d="M80 18 C 122 14 146 50 138 90 C 132 122 106 142 72 140 C 36 138 16 110 18 74 C 20 42 46 22 80 18 Z"
                fill={color} opacity=".92" />
          <path d="M40 90 Q 60 60 80 90 T 120 90"
                fill="none" stroke={PINK} strokeWidth="4" strokeLinecap="round" />
          <circle cx="62" cy="64" r="3.5" fill={PINK} />
          <circle cx="98" cy="64" r="3.5" fill={PINK} />
        </svg>
      </div>
    </div>
  );
}

// ─── marquee ──────────────────────────────────────────────────
// Self-contained, no external libs. Duplicates content so the seam is
// invisible and animates via CSS transform.

function Marquee({ items, speed = 60, height = 44, dot = '⌾', separator = true }) {
  // speed = px/sec. Duplicate the row N times so it tiles across any width.
  const ref = React.useRef(null);
  const [dupes, setDupes] = React.useState(2);
  React.useEffect(() => {
    if (!ref.current) return;
    const w = ref.current.scrollWidth / dupes;
    const need = Math.ceil((window.innerWidth * 2) / Math.max(w, 1)) + 1;
    if (need !== dupes) setDupes(need);
  }, [items, dupes]);

  const rowW = ref.current ? ref.current.scrollWidth / dupes : 800;
  const dur = rowW / speed;

  const row = items.map((t, i) => (
    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 18, paddingRight: 28 }}>
      {separator && <span style={{ opacity: .6, fontSize: 13 }}>{dot}</span>}
      <span>{t}</span>
    </span>
  ));

  return (
    <div style={{
      borderTop: `1px solid ${RULE}`,
      borderBottom: `1px solid ${RULE}`,
      overflow: 'hidden',
      height,
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      fontFamily: 'var(--mono)',
      fontSize: 13,
      letterSpacing: '.01em',
      color: INK,
    }}>
      <div ref={ref} style={{
        display: 'inline-flex',
        animation: `mq ${dur}s linear infinite`,
        willChange: 'transform',
      }}>
        {Array.from({ length: dupes }).map((_, k) => (
          <span key={k} style={{ display: 'inline-flex' }}>{row}</span>
        ))}
      </div>
      <style>{`@keyframes mq { from { transform: translateX(0) } to { transform: translateX(-${100 / dupes}%) } }`}</style>
    </div>
  );
}

// ─── monospace top nav (left | center | right) ───────────────
function TopNav({ left = 'designer, poet, vibe-coder', center = 'ayesha', right = ['Work', 'Play', 'Info'], onNav }) {
  const cell = { fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.02em', color: INK };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '20px 40px', borderBottom: `1px solid ${RULE}` }}>
      <div style={cell}>{left}</div>
      <div style={{ ...cell, fontWeight: 500 }}>{center}</div>
      <div style={{ ...cell, display: 'flex', gap: 18, justifyContent: 'flex-end' }}>
        {right.map((r) => (
          <a key={r} href="#" onClick={(e) => { e.preventDefault(); onNav && onNav(r.toLowerCase()); }}
             style={{ color: INK, textDecoration: 'none' }}
             onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
             onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}>
            {r}
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── arrow link ───────────────────────────────────────────────
function ArrowLink({ children, href = '#', onClick, dir = '→', size = 26 }) {
  return (
    <a href={href} onClick={(e) => { if (onClick) { e.preventDefault(); onClick(e); } }}
       style={{
         display: 'inline-flex', alignItems: 'baseline', gap: 14, color: INK,
         textDecoration: 'none', fontSize: size, fontWeight: 500, letterSpacing: '-.02em',
         lineHeight: 1.2,
       }}
       onMouseEnter={(e) => {
         const a = e.currentTarget.querySelector('[data-arrow]');
         if (a) a.style.transform = 'translateX(6px)';
       }}
       onMouseLeave={(e) => {
         const a = e.currentTarget.querySelector('[data-arrow]');
         if (a) a.style.transform = 'translateX(0)';
       }}>
      <span data-arrow style={{ display: 'inline-block', transition: 'transform .25s cubic-bezier(.2,.7,.3,1)' }}>{dir}</span>
      <span>{children}</span>
    </a>
  );
}

// ─── tiny footer ──────────────────────────────────────────────
function MiniFoot({ extra }) {
  return (
    <div style={{
      borderTop: `1px solid ${RULE}`,
      padding: '14px 40px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.04em', color: MUTE,
    }}>
      <span>© 2026 ayesha — built by hand &amp; vibe</span>
      {extra && <span style={{ marginLeft: 20, opacity: .7 }}>{extra}</span>}
    </div>
  );
}

// ─── app icons (iOS-style rounded-square) ────────────────────
// Each app gets a unique mark drawn from primitives. Backgrounds use the
// app's color; marks use the app's accent so they read at any size.

const ICON_MARKS = {
  'tea-room': (a) => (
    // a teacup seen head-on, with steam
    <g stroke={a} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M30 56 Q 28 90 60 92 Q 92 90 90 56 Z" fill={a} fillOpacity=".12" />
      <path d="M90 64 Q 108 64 108 78 Q 108 90 92 90" />
      <path d="M48 26 Q 44 36 50 44" />
      <path d="M62 22 Q 58 32 64 40" />
      <path d="M76 26 Q 72 36 78 44" />
    </g>
  ),
  'worry-jar': (a) => (
    // a stout jar with a lid + a small heavy dot inside
    <g stroke={a} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <rect x="32" y="38" width="56" height="60" rx="8" fill={a} fillOpacity=".12" />
      <line x1="28" y1="30" x2="92" y2="30" />
      <line x1="34" y1="48" x2="86" y2="48" />
      <circle cx="60" cy="74" r="9" fill={a} />
    </g>
  ),
  'pocket-garden': (a) => (
    // a small sprout in soil
    <g stroke={a} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M60 84 L 60 50" />
      <path d="M60 60 Q 42 56 36 40 Q 54 38 60 56" fill={a} fillOpacity=".18" />
      <path d="M60 68 Q 78 62 84 46 Q 66 46 60 64" fill={a} fillOpacity=".18" />
      <path d="M28 90 Q 60 96 92 90" />
      <circle cx="44" cy="92" r="2" fill={a} />
      <circle cx="76" cy="92" r="2" fill={a} />
    </g>
  ),
  'lullaby-machine': (a) => (
    // a crescent moon with a small note
    <g stroke={a} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M70 28 A 32 32 0 1 0 70 92 A 24 24 0 1 1 70 28 Z" fill={a} fillOpacity=".18" />
      <circle cx="36" cy="78" r="3.5" fill={a} />
      <circle cx="82" cy="44" r="2.5" fill={a} />
    </g>
  ),
  'index-of-feelings': (a) => (
    // a tiny grid of differently-filled squares
    <g stroke={a} strokeWidth="4" strokeLinejoin="round">
      {[0,1,2].map((row) => [0,1,2].map((col) => {
        const x = 30 + col * 22, y = 30 + row * 22;
        const filled = (row + col) % 2 === 0;
        return <rect key={row+'-'+col} x={x} y={y} width="14" height="14" rx="2" fill={filled ? a : 'none'} />;
      }))}
    </g>
  ),
  'thumbprint': (a) => (
    // a thumbprint spiral
    <g stroke={a} strokeWidth="5" strokeLinecap="round" fill="none">
      <path d="M60 30 C 80 30 92 46 92 64 C 92 80 78 92 60 92 C 46 92 36 80 36 66 C 36 56 46 48 60 48 C 70 48 78 56 78 66 C 78 72 72 78 64 78 C 60 78 56 74 56 70" />
    </g>
  ),
};

function AppIcon({ slug, size = 92, bg, mark, radius }) {
  const r = radius != null ? radius : size * 0.235;
  // Placeholder treatment: subtly-striped colored square with a tiny mono
  // label, matching the preview placeholders elsewhere. Drop in real
  // artwork later by replacing this component or passing children.
  return (
    <div style={{
      width: size, height: size, borderRadius: r, background: bg || '#eee',
      backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0) 0 9px, rgba(255,255,255,.22) 9px 10px)',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.35), 0 1px 0 rgba(0,0,0,.04), 0 4px 14px rgba(20,15,15,.06)',
      position: 'relative', flexShrink: 0, overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--mono)', fontSize: Math.max(9, size * 0.085),
        color: mark || 'rgba(0,0,0,.45)', letterSpacing: '.08em', textTransform: 'lowercase',
        opacity: .55, textAlign: 'center', padding: 6,
      }}>
        icon
      </div>
    </div>
  );
}

// expose
Object.assign(window, { PINK, INK, RULE, MUTE, APPS, SOON, Blob, Doodle, Marquee, TopNav, ArrowLink, MiniFoot, AppIcon });
