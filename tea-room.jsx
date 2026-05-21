// Tea Room v2 — clickable marketplace built on landing direction A.
// Home shows a big "play" button in a doodled circle; clicking goes
// to the Play page where the full marketplace lives.

const HERO_COPIES = {
  rooms: "hi i'm ayesha - a designer, poet, photographer, and musician who loves to vibe-code experimental apps and ecosystems. enjoy (:",
  welcome: 'welcome to the tea room — a marketplace of small soft apps made between songs and poems. nothing here you need, everything here you can sit inside for a minute.',
  vibe: 'the tea room is a marketplace of small soft apps. each one was vibe-coded in a sitting or two — half art, half utility, all slightly impractical. step in, take one home.',
};

const HERO_COPY_OPTIONS = [
  { value: 'rooms',   label: 'rooms, not products' },
  { value: 'welcome', label: 'welcome / soft apps' },
  { value: 'vibe',    label: 'vibe-coded, slightly impractical' },
];

function TeaRoom() {
  const [route, setRoute] = React.useState('home');
  const [trans, setTrans] = React.useState(0);
  const nav = (r) => { if (r === route) return; setRoute(r); setTrans((t) => t + 1); };

  const [t, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "heroCopy": "rooms",
    "showSpiral": true,
    "showBrewing": true
  }/*EDITMODE-END*/);

  let body;
  if (route === 'home') body = <TRHome nav={nav} t={t} />;
  else if (route === 'info') body = <TRInfo nav={nav} />;
  else if (route === 'play') body = <TRPlay nav={nav} />;
  else if (route.startsWith('app:')) {
    const app = APPS.find((a) => a.slug === route.slice(4));
    const soon = SOON.find((s) => s.slug === route.slice(4));
    body = app ? <TRAppDetail app={app} nav={nav} /> : (soon ? <TRBrewing app={soon} nav={nav} /> : <TRHome nav={nav} t={t} />);
  }

  return (
    <div style={{
      minHeight: '100vh', background: PINK, color: INK,
      fontFamily: 'var(--display)', display: 'flex', flexDirection: 'column',
    }}>
      <TRTopNav route={route} nav={nav} />
      <div key={trans} style={{ flex: 1, animation: 'tr-fade .35s cubic-bezier(.2,.7,.3,1) both' }}>
        {body}
      </div>
      <TweaksPanel title="Tweaks">
        <TweakSection label="Copy">
          <TweakRadio label="Hero" value={t.heroCopy} options={HERO_COPY_OPTIONS}
            onChange={(v) => setTweak('heroCopy', v)} />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakToggle label="Spiral in foot" value={t.showSpiral}
            onChange={(v) => setTweak('showSpiral', v)} />
          <TweakToggle label="Show brewing" value={t.showBrewing}
            onChange={(v) => setTweak('showBrewing', v)} />
        </TweakSection>
      </TweaksPanel>
      <style>{`
        @keyframes tr-fade { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
        @keyframes tr-spin-slow { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        .stagger > * { animation: tr-fade .45s cubic-bezier(.2,.7,.3,1) both }
        .stagger > *:nth-child(1) { animation-delay: .02s }
        .stagger > *:nth-child(2) { animation-delay: .07s }
        .stagger > *:nth-child(3) { animation-delay: .12s }
        .stagger > *:nth-child(4) { animation-delay: .17s }
        .stagger > *:nth-child(5) { animation-delay: .22s }
        .stagger > *:nth-child(6) { animation-delay: .27s }

        .tr-pad { padding-left: 48px; padding-right: 48px; }
        .tr-hero h1 { font-size: clamp(48px, 6.2vw, 84px); max-width: 17ch; }
        .tr-market-head { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; }
        .tr-market-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .tr-foot { display: grid; grid-template-columns: auto 1fr auto auto; gap: 56px; align-items: center; }
        .tr-foot-copy { font-size: 28px; font-weight: 500; letter-spacing: -.02em; line-height: 1.1; max-width: 24ch; }
        .tr-app-hero { display: grid; grid-template-columns: auto 1fr; gap: 32px; align-items: center; }
        .tr-app-body { display: grid; grid-template-columns: 1.1fr 1fr; gap: 40px; align-items: flex-start; }
        .tr-app-meta { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .tr-app-next { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
        .tr-app-next-title { font-size: 36px; font-weight: 500; letter-spacing: -.03em; }
        .tr-info-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 56px; }
        .tr-play-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .tr-display-xl { font-size: 56px; letter-spacing: -.04em; line-height: 1.02; }
        .tr-display-lg { font-size: 28px; letter-spacing: -.02em; }
        .tr-app-hero h1 { font-size: clamp(40px, 6vw, 80px); }
        .tr-brewing h1 { font-size: 56px; }

        .tr-play-circle { position: relative; width: 280px; height: 280px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .tr-play-circle svg.tr-play-doodle { position: absolute; inset: 0; width: 100%; height: 100%; transition: transform .8s cubic-bezier(.2,.7,.3,1); }
        .tr-play-circle:hover svg.tr-play-doodle { transform: rotate(18deg) scale(1.04); }
        .tr-play-circle .tr-play-label { position: relative; font-family: var(--display); font-size: 64px; font-weight: 500; letter-spacing: -.04em; color: ${INK}; transition: transform .35s; }
        .tr-play-circle:hover .tr-play-label { transform: translateY(-2px); }

        @media (max-width: 900px) {
          .tr-pad { padding-left: 28px; padding-right: 28px; }
          .tr-market-grid { grid-template-columns: repeat(2, 1fr); }
          .tr-foot { grid-template-columns: 1fr 1fr; gap: 32px; }
          .tr-foot > :last-child { display: none; }
          .tr-app-body { grid-template-columns: 1fr; }
          .tr-app-meta { grid-template-columns: repeat(2, 1fr); }
          .tr-info-grid { grid-template-columns: 1fr; gap: 40px; }
          .tr-play-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .tr-pad { padding-left: 20px; padding-right: 20px; }
          .tr-top-nav {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto;
            gap: 14px;
            padding: 16px 20px !important;
            text-align: center;
          }
          .tr-top-nav .tr-nav-left { display: none; }
          .tr-top-nav .tr-nav-center { justify-self: center; }
          .tr-top-nav .tr-nav-right {
            justify-content: center !important;
            justify-self: center;
            gap: 24px !important;
          }
          .tr-hero { padding-top: 36px !important; padding-bottom: 28px !important; }
          .tr-hero h1 {
            font-size: clamp(32px, 9vw, 48px) !important;
            max-width: none;
            letter-spacing: -.03em;
          }
          .tr-market-head .tr-market-title { font-size: 22px !important; }
          .tr-market-grid { grid-template-columns: 1fr; gap: 12px; }
          .tr-market-card { flex-wrap: wrap; padding: 16px !important; gap: 12px !important; }
          .tr-market-card-title { white-space: normal !important; font-size: 20px !important; }
          .tr-market-card .tr-market-card-btn { margin-left: auto; }
          .tr-foot {
            grid-template-columns: 1fr;
            gap: 28px;
            padding-top: 28px !important;
            padding-bottom: 24px !important;
          }
          .tr-foot-spiral { flex-direction: column; align-items: flex-start !important; gap: 16px !important; }
          .tr-foot-copy { font-size: 22px; max-width: none; }
          .tr-app-hero {
            grid-template-columns: 1fr;
            gap: 20px;
            text-align: center;
            justify-items: center;
          }
          .tr-app-hero-text { align-items: center; }
          .tr-app-hero h1 { font-size: clamp(32px, 10vw, 52px) !important; }
          .tr-app-hero-tag { font-size: 18px !important; }
          .tr-app-hero-actions { justify-content: center; }
          .tr-app-meta { grid-template-columns: 1fr; gap: 16px; }
          .tr-app-next { padding-top: 24px !important; padding-bottom: 24px !important; }
          .tr-app-next-title { font-size: 26px; }
          .tr-info-grid .tr-display-xl { font-size: clamp(32px, 9vw, 44px); }
          .tr-play-grid { grid-template-columns: 1fr; }
          .tr-play-head .tr-display-xl { font-size: clamp(32px, 9vw, 44px); max-width: none; }
          .tr-brewing h1 { font-size: clamp(32px, 10vw, 48px) !important; }
          .tr-mini-foot { padding-left: 20px !important; padding-right: 20px !important; flex-direction: column; gap: 6px; text-align: center; }
          .tr-crumb { flex-wrap: wrap; gap: 8px; }
          .tr-play-circle { width: 220px; height: 220px; }
          .tr-play-circle .tr-play-label { font-size: 48px; }
        }
      `}</style>
    </div>
  );
}

// ─── top nav ─────────────────────────────────────────────────
function TRTopNav({ route, nav }) {
  const items = ['Work', 'Play', 'Info'];
  const cell = { fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.02em', color: INK };
  const onWorkClick = () => nav('home');
  return (
    <div className="tr-top-nav" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '20px 48px', borderBottom: `1px solid ${RULE}` }}>
      <div className="tr-nav-left" style={cell}>designer, poet, vibe-coder</div>
      <a className="tr-nav-center" href="#" onClick={(e) => { e.preventDefault(); nav('home'); }} style={{ ...cell, fontWeight: 500, textDecoration: 'none' }}>ayesha&apos;s tea room</a>
      <div className="tr-nav-right" style={{ ...cell, display: 'flex', gap: 18, justifyContent: 'flex-end' }}>
        {items.map((r) => {
          const k = r.toLowerCase();
          const active = (k === 'work' && route === 'home') || route === k || (k === 'work' && route.startsWith('app:'));
          return (
            <a key={r} href="#" onClick={(e) => { e.preventDefault(); k === 'work' ? onWorkClick() : nav(k); }}
               style={{ color: INK, textDecoration: active ? 'underline' : 'none', textUnderlineOffset: 4 }}
               onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
               onMouseLeave={(e) => (e.currentTarget.style.textDecoration = active ? 'underline' : 'none')}>
              {r}
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ─── home ────────────────────────────────────────────────────
function TRHome({ nav, t }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* hero */}
      <div className="stagger tr-hero tr-pad" style={{ paddingTop: 64, paddingBottom: 40 }}>
        <h1 style={{
          fontFamily: 'var(--display)', fontWeight: 500,
          lineHeight: 1.02, letterSpacing: '-.035em',
          margin: 0, textWrap: 'pretty',
        }}>
          {HERO_COPIES[t.heroCopy]}
        </h1>
      </div>

      {/* big play button in a doodled circle */}
      <div className="tr-pad" style={{ display: 'flex', justifyContent: 'center', paddingTop: 24, paddingBottom: 64 }}>
        <PlayCircle onClick={() => nav('play')} />
      </div>

      {/* foot row */}
      <div className="tr-foot tr-pad" style={{ paddingTop: 36, paddingBottom: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <ArrowLink onClick={() => nav('home')}>Work</ArrowLink>
          <ArrowLink onClick={() => nav('play')}>Play</ArrowLink>
          <ArrowLink onClick={() => nav('info')}>Info</ArrowLink>
        </div>
        <div className="tr-foot-spiral" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {t.showSpiral && <SpiralMark size={120} color={INK} />}
          <div className="tr-foot-copy">
            a portfolio of vibe-coded little apps,<br />updated whenever the room is warm.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--mono)', fontSize: 13 }}>
          <a href="#" style={{ color: INK, textDecoration: 'none' }}>↗ are.na</a>
          <a href="#" style={{ color: INK, textDecoration: 'none' }}>↗ github</a>
          <a href="#" style={{ color: INK, textDecoration: 'none' }}>↗ letters</a>
        </div>
        <div />
      </div>

      <MiniFoot />
    </div>
  );
}

// ─── play circle (the big button) ─────────────────────────────
function PlayCircle({ onClick }) {
  return (
    <div className="tr-play-circle" onClick={onClick} role="button" tabIndex={0}
         onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}>
      <svg className="tr-play-doodle" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        {/* wobbly hand-drawn circle, two passes for a sketchy feel */}
        <path d="M150 22 C 210 24 270 70 274 140 C 278 210 220 274 152 276 C 84 278 26 220 24 152 C 22 84 80 22 150 22 Z"
              fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M152 30 C 214 34 264 78 268 144 C 272 208 218 270 150 270 C 86 270 32 214 30 150 C 28 86 86 30 152 30 Z"
              fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".5" />
        {/* tiny decorative ticks around the circle */}
        <g stroke={INK} strokeWidth="2" strokeLinecap="round">
          <line x1="150" y1="6" x2="150" y2="14" />
          <line x1="150" y1="286" x2="150" y2="294" />
          <line x1="6" y1="150" x2="14" y2="150" />
          <line x1="286" y1="150" x2="294" y2="150" />
          <line x1="48" y1="48" x2="54" y2="54" />
          <line x1="246" y1="48" x2="252" y2="54" />
          <line x1="48" y1="246" x2="54" y2="252" />
          <line x1="246" y1="246" x2="252" y2="252" />
        </g>
      </svg>
      <span className="tr-play-label">play</span>
    </div>
  );
}

// ─── spiral mark ──────────────────────────────────────────────
function SpiralMark({ size = 120, color = INK }) {
  return (
    <svg viewBox="0 0 140 140" width={size} height={size} style={{ overflow: 'visible', flexShrink: 0 }}>
      <path d="M70 70 m -3 0 a 3 3 0 1 1 6 0 a 10 10 0 1 1 -20 0 a 20 20 0 1 1 40 0 a 32 32 0 1 1 -64 0 a 46 46 0 1 1 92 0"
            fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── marketplace grid ────────────────────────────────────────
function MarketGrid({ nav, showBrewing }) {
  const items = [
    ...APPS.map((a) => ({ kind: 'live', app: a })),
    ...(showBrewing ? SOON.map((a) => ({ kind: 'brew', app: a })) : []),
  ];
  return (
    <div className="stagger tr-market-grid">
      {items.map(({ kind, app }) => (
        <MarketCard key={app.slug} app={app} kind={kind}
          onOpen={() => nav('app:' + app.slug)} />
      ))}
    </div>
  );
}

function MarketCard({ app, kind, onOpen }) {
  const [hov, setHov] = React.useState(false);
  const live = kind === 'live';
  const accent = live ? app.accent : 'rgba(26,20,20,.55)';
  const bg = live ? app.color : '#ece4e6';
  return (
    <div className="tr-market-card"
         onClick={live ? onOpen : undefined}
         onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
         style={{
           display: 'flex', alignItems: 'center', gap: 16, padding: 18,
           border: `1px solid ${RULE}`, borderRadius: 16,
           background: hov && live ? 'rgba(255,255,255,.5)' : 'rgba(255,255,255,.18)',
           cursor: live ? 'pointer' : 'default',
           transition: 'background .2s, transform .25s, box-shadow .25s',
           transform: hov && live ? 'translateY(-2px)' : 'none',
           boxShadow: hov && live ? '0 8px 24px rgba(20,10,10,.06)' : 'none',
           opacity: live ? 1 : .68,
         }}>
      <AppIcon slug={app.slug} size={84} bg={bg} mark={accent} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: MUTE, letterSpacing: '.06em', textTransform: 'uppercase' }}>
          {live ? (app.medium && app.medium[0]) : 'brewing'}
        </div>
        <div className="tr-market-card-title" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-.025em', lineHeight: 1.05, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {app.title}
        </div>
        <div style={{ fontSize: 13, color: MUTE, fontStyle: 'italic', lineHeight: 1.3,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {app.tag}
        </div>
      </div>
      <button className="tr-market-card-btn" onClick={(e) => { e.stopPropagation(); if (live) onOpen(); }}
        style={{
          flexShrink: 0,
          border: live ? 'none' : `1px dashed ${RULE}`,
          borderRadius: 999,
          background: live ? INK : 'transparent',
          color: live ? PINK : MUTE,
          padding: live ? '8px 16px' : '8px 14px',
          fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, letterSpacing: '.04em',
          textTransform: 'uppercase', cursor: live ? 'pointer' : 'default',
        }}>
        {live ? 'open' : 'soon'}
      </button>
    </div>
  );
}

// ─── app detail ──────────────────────────────────────────────
function TRAppDetail({ app, nav }) {
  const idx = APPS.findIndex((a) => a.slug === app.slug);
  const next = APPS[(idx + 1) % APPS.length];

  return (
    <div>
      {/* breadcrumbs */}
      <div className="tr-crumb tr-pad" style={{ paddingTop: 24, paddingBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--mono)', fontSize: 12, color: MUTE }}>
        <a href="#" onClick={(e) => { e.preventDefault(); nav('play'); }} style={{ color: MUTE, textDecoration: 'none' }}>← back to the marketplace</a>
        <span>{app.n} of {APPS.length.toString().padStart(2, '0')}</span>
      </div>

      {/* hero band */}
      <div className="stagger tr-app-hero tr-pad" style={{ paddingTop: 28, paddingBottom: 36 }}>
        <AppIcon slug={app.slug} size={156} bg={app.color} mark={app.accent} radius={36} />
        <div className="tr-app-hero-text" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: app.accent, letterSpacing: '.08em', textTransform: 'uppercase' }}>
            ●  {app.medium.join(' · ')}  ·  {app.year}
          </div>
          <h1 style={{ fontFamily: 'var(--display)', fontWeight: 500, letterSpacing: '-.04em', lineHeight: .95, margin: 0 }}>
            {app.title}
          </h1>
          <div className="tr-app-hero-tag" style={{ fontSize: 22, color: MUTE, fontStyle: 'italic', letterSpacing: '-.015em', marginTop: 2 }}>
            {app.tag}
          </div>
          <div className="tr-app-hero-actions" style={{ display: 'flex', gap: 12, marginTop: 14, flexWrap: 'wrap' }}>
            <button style={{
              border: 'none', background: INK, color: PINK, padding: '12px 22px', borderRadius: 999,
              fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, letterSpacing: '.06em',
              textTransform: 'uppercase', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              open {app.title} <span>↗</span>
            </button>
            <button style={{
              border: `1px solid ${INK}`, background: 'transparent', color: INK, padding: '11px 22px', borderRadius: 999,
              fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase', cursor: 'pointer',
            }}>
              save for later
            </button>
          </div>
        </div>
      </div>

      {/* description + preview */}
      <div className="tr-app-body tr-pad" style={{ paddingBottom: 36 }}>
        <div>
          <h3 style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: MUTE, margin: '0 0 12px' }}>about this room</h3>
          <p style={{ fontSize: 19, lineHeight: 1.5, margin: 0, maxWidth: '52ch' }}>{app.desc}</p>
        </div>
        <div style={{
          aspectRatio: '4 / 5', background: app.color, borderRadius: 18, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
          backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,.0) 0 22px, rgba(255,255,255,.18) 22px 23px)`,
        }}>
          <div style={{ position: 'absolute', top: 16, left: 18, fontFamily: 'var(--mono)', fontSize: 11, color: app.accent, opacity: .85 }}>
            preview · placeholder
          </div>
          <AppIcon slug={app.slug} size={180} bg="rgba(255,255,255,.55)" mark={app.accent} radius={42} />
        </div>
      </div>

      <MiniFoot />
    </div>
  );
}

// ─── brewing detail ──────────────────────────────────────────
function TRBrewing({ app, nav }) {
  return (
    <div className="tr-brewing tr-pad" style={{ paddingTop: 60, paddingBottom: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
      <AppIcon slug={app.slug} size={140} bg="#ece4e6" mark={MUTE} radius={32} />
      <h1 style={{ fontFamily: 'var(--display)', fontWeight: 500, letterSpacing: '-.04em', margin: 0 }}>{app.title}</h1>
      <div style={{ fontSize: 20, color: MUTE, fontStyle: 'italic' }}>{app.tag}</div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: MUTE, letterSpacing: '.06em', textTransform: 'uppercase' }}>still brewing — back in a few days</div>
      <button onClick={() => nav('play')} style={{
        marginTop: 12, border: `1px solid ${INK}`, background: 'transparent', color: INK,
        padding: '11px 22px', borderRadius: 999, fontFamily: 'var(--mono)', fontSize: 12,
        fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase', cursor: 'pointer',
      }}>← back to the marketplace</button>
    </div>
  );
}

// ─── info ────────────────────────────────────────────────────
function TRInfo({ nav }) {
  return (
    <div>
      <div className="tr-info-grid tr-pad" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: MUTE, letterSpacing: '.08em', textTransform: 'uppercase' }}>info — about the room</div>
          <h2 className="tr-display-xl" style={{ fontFamily: 'var(--display)', fontWeight: 500, margin: '12px 0 18px' }}>
            hi, i&apos;m ayesha. i make ecosystems of experience.
          </h2>
          <p style={{ fontSize: 19, lineHeight: 1.55, maxWidth: '50ch', margin: 0 }}>
            i blend experimental graphic design, music production, poetry, and software into projects that are usually small, sometimes useless, occasionally moving. the tea room is where i put all of them while they finish brewing.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.55, maxWidth: '50ch', marginTop: 18, color: 'rgba(26,20,20,.7)' }}>
            most of these apps were vibe-coded in an evening or two. some never get finished. that&apos;s the point — the marketplace is the journal. come back in a few days, there&apos;ll be another room.
          </p>
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <ArrowLink onClick={() => nav('play')} size={22}>visit the marketplace</ArrowLink>
            <ArrowLink onClick={() => nav('home')} size={22}>back home</ArrowLink>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <TRInfoCard title="elsewhere" rows={[['are.na', '↗'], ['github', '↗'], ['letters (substack)', '↗'], ['email', 'hello @ tea.room']]} />
          <TRInfoCard title="now (may 2026)" rows={[['reading', 'le guin essays'], ['listening', 'arthur russell loops'], ['making', 'tea room'], ['drinking', 'genmaicha, lots']]} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 22px', border: `1px solid ${RULE}`, borderRadius: 12 }}>
            <SpiralMark size={48} color={INK} />
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: MUTE, lineHeight: 1.5 }}>
              this site refreshes every few days as new rooms open. you can subscribe to letters for a quiet weekly note.
            </div>
          </div>
        </div>
      </div>
      <MiniFoot />
    </div>
  );
}

function TRInfoCard({ title, rows }) {
  return (
    <div style={{ border: `1px solid ${RULE}`, borderRadius: 12, padding: 20 }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: MUTE, marginBottom: 14 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {rows.map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: `1px dotted ${RULE}`, fontSize: 14 }}>
            <span style={{ color: INK }}>{k}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: MUTE }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── play (the marketplace) ──────────────────────────────────
function TRPlay({ nav }) {
  return (
    <div>
      <div className="tr-play-head tr-pad" style={{ paddingTop: 40, paddingBottom: 8 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: MUTE, letterSpacing: '.08em', textTransform: 'uppercase' }}>play — the marketplace</div>
        <h2 className="tr-display-xl" style={{ fontFamily: 'var(--display)', fontWeight: 500, margin: '12px 0 16px', maxWidth: '22ch' }}>
          small soft apps, made between songs and poems.
        </h2>
      </div>
      <div className="tr-pad" style={{ paddingTop: 12, paddingBottom: 40 }}>
        <MarketGrid nav={nav} showBrewing={true} />
      </div>
      <MiniFoot />
    </div>
  );
}

Object.assign(window, { TeaRoom });
