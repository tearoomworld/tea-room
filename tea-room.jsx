// Tea Room v2 — clickable marketplace built on landing direction A.
// Home shows a 3×2 grid (or marquee) of app-store icons; clicking any
// icon opens its app page. Spiral lifted from variant B replaces the
// doodle in the foot row.

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

  // Tweaks
  const [t, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "heroCopy": "rooms",
    "marketplaceLayout": "grid",
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
          <TweakRadio label="Marketplace" value={t.marketplaceLayout}
            options={[{ value: 'grid', label: 'Grid' }, { value: 'marquee', label: 'Marquee' }]}
            onChange={(v) => setTweak('marketplaceLayout', v)} />
          <TweakToggle label="Spiral in foot" value={t.showSpiral}
            onChange={(v) => setTweak('showSpiral', v)} />
          <TweakToggle label="Show brewing" value={t.showBrewing}
            onChange={(v) => setTweak('showBrewing', v)} />
        </TweakSection>
      </TweaksPanel>
      <style>{`
        @keyframes tr-fade { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
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

      {/* marketplace — marquee on home */}
      <div className="tr-pad" style={{ paddingTop: 8, paddingBottom: 8 }}>
        <div className="tr-market-head" style={{ marginBottom: 18, borderBottom: `1px solid ${RULE}`, paddingBottom: 14 }}>
          <div className="tr-market-title tr-display-lg" style={{
            fontFamily: 'var(--display)', fontWeight: 400,
            fontStyle: 'italic', color: INK,
          }}>
            the marketplace —
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: MUTE, letterSpacing: '.02em' }}>
            {APPS.length} open · {SOON.length} brewing
          </div>
        </div>

        <MarketMarquee nav={nav} showBrewing={true} />
      </div>

        {t.marketplaceLayout === 'grid'
          ? <MarketGrid nav={nav} showBrewing={t.showBrewing} />
          : <MarketMarquee nav={nav} showBrewing={t.showBrewing} />}
      </div>

      {/* divider marquee — names cycling, matches reference */}
      <div style={{ marginTop: 36 }}>
        <Marquee items={[...APPS.map((a) => a.title), ...SOON.map((s) => s.title), 'tea room', 'worry jar', 'pocket garden']} />
      </div>

      {/* foot row */}
      <div className="tr-foot tr-pad" style={{ paddingTop: 36, paddingBottom: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <ArrowLink onClick={() => window.scrollTo({ top: document.body.scrollHeight * .2, behavior: 'smooth' })}>Work</ArrowLink>
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

// ─── spiral mark (lifted from B's vibe) ───────────────────────
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
          border: 'none', borderRadius: 999,
          background: live ? INK : 'transparent',
          color: live ? PINK : MUTE,
          padding: live ? '8px 16px' : '8px 14px',
          fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, letterSpacing: '.04em',
          textTransform: 'uppercase', cursor: live ? 'pointer' : 'default',
          border: live ? 'none' : `1px dashed ${RULE}`,
        }}>
        {live ? 'open' : 'soon'}
      </button>
    </div>
  );
}

// ─── marketplace marquee ─────────────────────────────────────
function MarketMarquee({ nav, showBrewing }) {
  const items = [
    ...APPS.map((a) => ({ kind: 'live', app: a })),
    ...(showBrewing ? SOON.map((a) => ({ kind: 'brew', app: a })) : []),
  ];
  // duplicate so the marquee loops seamlessly
  const ref = React.useRef(null);
  const [paused, setPaused] = React.useState(false);
  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}`, padding: '24px 0' }}
         onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div ref={ref} style={{
        display: 'inline-flex', gap: 18,
        animation: `tr-mq 40s linear infinite`,
        animationPlayState: paused ? 'paused' : 'running',
      }}>
        {[0, 1].map((k) => (
          <div key={k} style={{ display: 'inline-flex', gap: 18, paddingRight: 18 }}>
            {items.map(({ kind, app }) => (
              <MarqueeIcon key={k + app.slug} app={app} kind={kind}
                onOpen={() => kind === 'live' && nav('app:' + app.slug)} />
            ))}
          </div>
        ))}
      </div>
      <style>{`@keyframes tr-mq { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

function MarqueeIcon({ app, kind, onOpen }) {
  const live = kind === 'live';
  const [hov, setHov] = React.useState(false);
  return (
    <button onClick={onOpen} disabled={!live}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{
              border: 'none', background: 'transparent', padding: 0,
              cursor: live ? 'pointer' : 'default', textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              minWidth: 110, opacity: live ? 1 : .55,
              transform: hov && live ? 'translateY(-3px)' : 'none', transition: 'transform .25s',
            }}>
      <AppIcon slug={app.slug} size={88} bg={live ? app.color : '#ece4e6'} mark={live ? app.accent : MUTE} />
      <div style={{ fontFamily: 'var(--display)', fontSize: 14, fontWeight: 500, color: INK, letterSpacing: '-.01em' }}>
        {app.title}
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: MUTE, letterSpacing: '.06em', textTransform: 'uppercase' }}>
        {live ? 'open' : 'brewing'}
      </div>
    </button>
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
        <a href="#" onClick={(e) => { e.preventDefault(); nav('home'); }} style={{ color: MUTE, textDecoration: 'none' }}>← back to the room</a>
        <span>{app.n} of {APPS.length.toString().padStart(2, '0')}</span>
      </div>

      {/* hero band — icon + name + description, app-store-detail vibe */}
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

      {/* description + preview placeholder */}
      <div className="tr-app-body tr-pad" style={{ paddingBottom: 36 }}>
        <div>
          <h3 style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: MUTE, margin: '0 0 12px' }}>about this room</h3>
          <p style={{ fontSize: 19, lineHeight: 1.5, margin: 0, maxWidth: '52ch' }}>{app.desc}</p>
          <p style={{ fontSize: 16, lineHeight: 1.55, marginTop: 18, color: 'rgba(26,20,20,.7)', maxWidth: '52ch' }}>
            i wanted this to feel like one of those rooms in a friend&apos;s house where everyone ends up sitting on the floor. small footprint, low lighting, nothing to optimise. arrive, do the thing, close the tab.
          </p>
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
          <div style={{ position: 'absolute', bottom: 16, right: 18, fontFamily: 'var(--mono)', fontSize: 11, color: app.accent, opacity: .7 }}>
            drop screenshot here
          </div>
        </div>
      </div>

      {/* meta strip */}
      <div className="tr-app-meta tr-pad" style={{ borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}`, paddingTop: 18, paddingBottom: 18, fontFamily: 'var(--mono)', fontSize: 12 }}>
        <DMeta k="status" v="open & steeping" />
        <DMeta k="built in" v="3 evenings" />
        <DMeta k="stack" v="react · web audio · localstorage" />
        <DMeta k="changelog" v="v0.4 — added quiet mode" />
      </div>

      {/* next */}
      <a href="#" onClick={(e) => { e.preventDefault(); nav('app:' + next.slug); }}
         className="tr-app-next tr-pad"
         style={{ paddingTop: 32, paddingBottom: 32,
           color: INK, textDecoration: 'none', background: next.color + '88',
           transition: 'background .2s' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'rgba(26,20,20,.6)' }}>next room —</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <AppIcon slug={next.slug} size={56} bg={'rgba(255,255,255,.45)'} mark={next.accent} radius={14} />
          <span className="tr-app-next-title">{next.title}  →</span>
        </span>
      </a>

      <MiniFoot />
    </div>
  );
}

function DMeta({ k, v }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ color: MUTE, letterSpacing: '.06em', textTransform: 'uppercase', fontSize: 10 }}>{k}</span>
      <span style={{ color: INK }}>{v}</span>
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
      <button onClick={() => nav('home')} style={{
        marginTop: 12, border: `1px solid ${INK}`, background: 'transparent', color: INK,
        padding: '11px 22px', borderRadius: 999, fontFamily: 'var(--mono)', fontSize: 12,
        fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase', cursor: 'pointer',
      }}>← back to the room</button>
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
            <ArrowLink onClick={() => nav('home')} size={22}>see what&apos;s open</ArrowLink>
            <ArrowLink onClick={() => nav('play')} size={22}>poke at the scraps</ArrowLink>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <TRInfoCard title="elsewhere" rows={[['are.na', '↗'], ['github', '↗'], ['letters (substack)', '↗'], ['email', 'hello @ tea.room']]} />
          <TRInfoCard title="now (may 2026)" rows={[['reading', 'le guin essays'], ['listening', 'arthur russell loops'], ['making', 'lullaby machine'], ['drinking', 'genmaicha, lots']]} />
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

// ─── play (scraps) ───────────────────────────────────────────
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
