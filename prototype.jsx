// Full interactive prototype — landing, work index, app detail, info, play.
// Pure-React state routing; lives inside one artboard. Re-uses TopNav,
// Marquee, ArrowLink, Doodle, and APPS from shared.jsx.

function Prototype() {
  // route can be: 'home' | 'work' | 'play' | 'info' | 'app:<slug>'
  const [route, setRoute] = React.useState('home');
  const [trans, setTrans] = React.useState(0); // bumps to retrigger entry anims
  const nav = (r) => { if (r === route) return; setRoute(r); setTrans((t) => t + 1); window.scrollTo?.(0, 0); };

  let body;
  if (route === 'home')       body = <Home nav={nav} />;
  else if (route === 'work')  body = <Work nav={nav} />;
  else if (route === 'play')  body = <Play nav={nav} />;
  else if (route === 'info')  body = <Info nav={nav} />;
  else if (route.startsWith('app:')) {
    const app = APPS.find((a) => a.slug === route.slice(4));
    body = app ? <AppDetail app={app} nav={nav} /> : <Home nav={nav} />;
  }

  return (
    <div key={trans} style={{
      width: '100%', height: '100%', background: PINK, color: INK,
      fontFamily: 'var(--display)',
      display: 'flex', flexDirection: 'column',
      animation: 'fadein .35s cubic-bezier(.2,.7,.3,1) both',
    }}>
      <ProtoNav route={route} nav={nav} />
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>{body}</div>
      <style>{`
        @keyframes fadein { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
        @keyframes slidein { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
        .stagger > * { animation: slidein .5s cubic-bezier(.2,.7,.3,1) both }
        .stagger > *:nth-child(1) { animation-delay: .04s }
        .stagger > *:nth-child(2) { animation-delay: .10s }
        .stagger > *:nth-child(3) { animation-delay: .16s }
        .stagger > *:nth-child(4) { animation-delay: .22s }
        .stagger > *:nth-child(5) { animation-delay: .28s }
        .stagger > *:nth-child(6) { animation-delay: .34s }
      `}</style>
    </div>
  );
}

// ─── nav with active state ──────────────────────────────────
function ProtoNav({ route, nav }) {
  const items = ['Work', 'Play', 'Info'];
  const cell = { fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.02em', color: INK };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '20px 40px', borderBottom: `1px solid ${RULE}` }}>
      <a href="#" onClick={(e) => { e.preventDefault(); nav('home'); }} style={{ ...cell, textDecoration: 'none' }}>
        designer, poet, vibe-coder
      </a>
      <a href="#" onClick={(e) => { e.preventDefault(); nav('home'); }} style={{ ...cell, fontWeight: 500, textDecoration: 'none' }}>ayesha&apos;s tea room</a>
      <div style={{ ...cell, display: 'flex', gap: 18, justifyContent: 'flex-end' }}>
        {items.map((r) => {
          const active = route === r.toLowerCase();
          return (
            <a key={r} href="#" onClick={(e) => { e.preventDefault(); nav(r.toLowerCase()); }}
               style={{ color: INK, textDecoration: active ? 'underline' : 'none', textUnderlineOffset: 4 }}>
              {r}
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ─── home page ──────────────────────────────────────────────
function Home({ nav }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '56px 48px 48px', flex: 1 }} className="stagger">
        <h1 style={{
          fontFamily: 'var(--display)', fontWeight: 500, fontSize: 72, lineHeight: 1.02,
          letterSpacing: '-.035em', margin: 0, textWrap: 'pretty', maxWidth: '17ch',
        }}>
          ayesha is a designer in a tiny apartment who builds soft small worlds — apps that hum, hold, and bloom — somewhere between graphic design, music, poetry, and code.
        </h1>
      </div>

      <Marquee items={[...APPS.map((a) => a.title), ...SOON.map((s) => s.title)]} />

      <div style={{ padding: '36px 48px 28px', display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 56, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <ArrowLink onClick={() => nav('work')}>Work</ArrowLink>
          <ArrowLink onClick={() => nav('play')}>Play</ArrowLink>
          <ArrowLink onClick={() => nav('info')}>Info</ArrowLink>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <Doodle size={130} color={INK} />
          <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-.02em', lineHeight: 1.1, maxWidth: '22ch' }}>
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

// ─── work index ─────────────────────────────────────────────
function Work({ nav }) {
  const [filter, setFilter] = React.useState('all');
  const mediums = ['all', ...new Set(APPS.flatMap((a) => a.medium))];
  const list = filter === 'all' ? APPS : APPS.filter((a) => a.medium.includes(filter));

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '40px 48px 8px' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: MUTE, letterSpacing: '.08em', textTransform: 'uppercase' }}>
          ← work / vol. 1
        </div>
        <h2 style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 64, letterSpacing: '-.04em', margin: '12px 0 18px', maxWidth: '20ch' }}>
          three rooms, all open, kettle is on.
        </h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: MUTE, marginRight: 4 }}>filter —</span>
          {mediums.map((m) => (
            <button key={m} onClick={() => setFilter(m)} style={{
              border: `1px solid ${filter === m ? INK : RULE}`,
              background: filter === m ? INK : 'transparent',
              color: filter === m ? PINK : INK,
              padding: '5px 12px', borderRadius: 999, cursor: 'pointer',
              fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.02em',
              transition: 'all .15s',
            }}>{m}</button>
          ))}
        </div>
      </div>

      <div className="stagger" style={{ padding: '24px 48px 40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {list.map((app) => (
          <AppCard key={app.slug} app={app} onClick={() => nav('app:' + app.slug)} />
        ))}
        {SOON.map((s) => (
          <div key={s.slug} style={{
            border: `1px dashed ${RULE}`, borderRadius: 4, padding: 24,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            minHeight: 280, opacity: .7,
          }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: MUTE, letterSpacing: '.06em', textTransform: 'uppercase' }}>brewing</div>
              <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-.025em', marginTop: 10 }}>{s.title}</div>
              <div style={{ marginTop: 8, fontSize: 14, color: MUTE, fontStyle: 'italic' }}>{s.tag}</div>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: MUTE }}>—— soon</div>
          </div>
        ))}
      </div>

      <Marquee items={['back to home', 'or keep scrolling', 'or hold the kettle', 'or refresh in a few days']} height={36} />
      <MiniFoot />
    </div>
  );
}

function AppCard({ app, onClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }}
       onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
       style={{
         display: 'flex', flexDirection: 'column', textDecoration: 'none', color: INK,
         border: `1px solid ${RULE}`, borderRadius: 4, padding: 0,
         background: hov ? 'rgba(255,255,255,.35)' : 'transparent',
         transition: 'background .2s, transform .25s',
         transform: hov ? 'translateY(-2px)' : 'none',
         minHeight: 280, overflow: 'hidden',
       }}>
      {/* placeholder swatch */}
      <div style={{
        height: 132, background: app.color, position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: `1px solid ${RULE}`,
      }}>
        <div style={{ position: 'absolute', top: 10, left: 12, fontFamily: 'var(--mono)', fontSize: 11, color: app.accent, opacity: .7 }}>
          {app.n} / {app.year}
        </div>
        <Blob size={70} color={app.accent} variant={['blob', 'spiral', 'loop'][parseInt(app.n) % 3]} />
      </div>
      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1 }}>{app.title}</div>
        <div style={{ fontSize: 14, color: MUTE, fontStyle: 'italic' }}>{app.tag}</div>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {app.medium.map((m) => (
              <span key={m} style={{ fontFamily: 'var(--mono)', fontSize: 10, color: MUTE, padding: '2px 7px', border: `1px solid ${RULE}`, borderRadius: 999 }}>{m}</span>
            ))}
          </div>
          <span style={{ fontSize: 18, transform: hov ? 'translateX(4px)' : 'none', transition: 'transform .25s' }}>→</span>
        </div>
      </div>
    </a>
  );
}

// ─── app detail ─────────────────────────────────────────────
function AppDetail({ app, nav }) {
  const idx = APPS.findIndex((a) => a.slug === app.slug);
  const next = APPS[(idx + 1) % APPS.length];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* breadcrumbs */}
      <div style={{ padding: '20px 48px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--mono)', fontSize: 12, color: MUTE }}>
        <a href="#" onClick={(e) => { e.preventDefault(); nav('work'); }} style={{ color: MUTE, textDecoration: 'none' }}>← all rooms</a>
        <span>{app.n} of {APPS.length.toString().padStart(2, '0')}</span>
      </div>

      {/* hero band */}
      <div className="stagger" style={{ padding: '32px 48px 48px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 56, alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: app.accent, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 14 }}>
            ●  {app.medium.join(' · ')}  ·  {app.year}
          </div>
          <h1 style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 96, letterSpacing: '-.05em', lineHeight: .92, margin: 0 }}>
            {app.title}
          </h1>
          <p style={{ marginTop: 22, fontSize: 26, lineHeight: 1.25, letterSpacing: '-.018em', maxWidth: '24ch', fontWeight: 400 }}>
            {app.tag}.
          </p>
          <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.55, maxWidth: '52ch', color: 'rgba(26,20,20,.78)' }}>
            {app.desc}
          </p>

          <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button style={{
              border: 'none', background: INK, color: PINK, padding: '14px 22px', borderRadius: 999,
              fontFamily: 'var(--display)', fontSize: 16, fontWeight: 500, cursor: 'pointer', letterSpacing: '-.01em',
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              open {app.title} <span>↗</span>
            </button>
            <button style={{
              border: `1px solid ${INK}`, background: 'transparent', color: INK, padding: '13px 22px', borderRadius: 999,
              fontFamily: 'var(--display)', fontSize: 16, fontWeight: 500, cursor: 'pointer',
            }}>
              read the notes
            </button>
          </div>
        </div>

        {/* visual */}
        <div style={{
          aspectRatio: '4 / 5', background: app.color, borderRadius: 4, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 14, left: 16, fontFamily: 'var(--mono)', fontSize: 11, color: app.accent }}>
            preview / placeholder
          </div>
          <Blob size={200} color={app.accent} variant={['blob', 'spiral', 'loop'][idx % 3]} />
          <div style={{ position: 'absolute', bottom: 14, right: 16, fontFamily: 'var(--mono)', fontSize: 11, color: app.accent, opacity: .7 }}>
            drop screenshot here
          </div>
        </div>
      </div>

      {/* meta strip */}
      <div style={{ borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}`, padding: '18px 48px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, fontFamily: 'var(--mono)', fontSize: 12 }}>
        <Meta k="status" v="open & steeping" />
        <Meta k="built in" v="3 evenings" />
        <Meta k="stack" v="react · web audio · localstorage" />
        <Meta k="changelog" v="v0.4 — added quiet mode" />
      </div>

      {/* notes */}
      <div style={{ padding: '40px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <div>
          <h3 style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: MUTE, margin: '0 0 12px' }}>field notes</h3>
          <p style={{ fontSize: 18, lineHeight: 1.55, margin: 0, maxWidth: '46ch' }}>
            i wanted this to feel like one of those rooms in a friend&apos;s house where everyone ends up sitting on the floor. small footprint, low lighting, nothing to optimise. you arrive, you do the thing, you close the tab.
          </p>
        </div>
        <div>
          <h3 style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: MUTE, margin: '0 0 12px' }}>references</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--mono)', fontSize: 13 }}>
            <li>— the way kettles whistle</li>
            <li>— group chats that go quiet for days</li>
            <li>— furniture you can&apos;t see in the dark</li>
            <li>— that one essay about pockets</li>
          </ul>
        </div>
      </div>

      {/* next */}
      <a href="#" onClick={(e) => { e.preventDefault(); nav('app:' + next.slug); }}
         style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px 48px',
           borderTop: `1px solid ${RULE}`, color: INK, textDecoration: 'none', background: next.color + '55',
           transition: 'background .2s' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: MUTE }}>next room —</span>
        <span style={{ fontSize: 40, fontWeight: 500, letterSpacing: '-.03em' }}>{next.title}  →</span>
      </a>

      <MiniFoot />
    </div>
  );
}

function Meta({ k, v }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ color: MUTE, letterSpacing: '.06em', textTransform: 'uppercase', fontSize: 10 }}>{k}</span>
      <span style={{ color: INK }}>{v}</span>
    </div>
  );
}

// ─── play page ──────────────────────────────────────────────
function Play({ nav }) {
  const items = [
    { name: 'fortune cookie', tag: 'click for a small inscrutable line', kind: 'toy' },
    { name: 'kettle whistle', tag: 'a sound piece, 3 mins', kind: 'sound' },
    { name: 'thursday poem', tag: 'a poem rewritten every thursday', kind: 'poem' },
    { name: 'pink walk', tag: 'cursor follower with a soft tail', kind: 'toy' },
    { name: 'voice memo', tag: 'unfinished song about a window', kind: 'sound' },
    { name: 'three things', tag: 'a list of three things from today', kind: 'note' },
  ];
  return (
    <div>
      <div style={{ padding: '40px 48px 8px' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: MUTE, letterSpacing: '.08em', textTransform: 'uppercase' }}>← play / scraps</div>
        <h2 style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 64, letterSpacing: '-.04em', margin: '12px 0 16px', maxWidth: '22ch' }}>
          little things that aren&apos;t quite apps but still wanted to be made.
        </h2>
      </div>
      <div className="stagger" style={{ padding: '12px 48px 40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {items.map((it, i) => (
          <div key={it.name} style={{
            border: `1px solid ${RULE}`, borderRadius: 4, padding: 22,
            display: 'flex', flexDirection: 'column', gap: 8, minHeight: 170,
            background: i % 2 ? 'transparent' : 'rgba(255,255,255,.25)',
            cursor: 'pointer', transition: 'transform .2s, background .2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'rgba(255,255,255,.45)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = i % 2 ? 'transparent' : 'rgba(255,255,255,.25)'; }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: MUTE, letterSpacing: '.08em', textTransform: 'uppercase' }}>{it.kind}</span>
              <Blob size={28} color={INK} variant={['squiggle', 'wave', 'loop'][i % 3]} />
            </div>
            <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-.025em', marginTop: 'auto' }}>{it.name}</div>
            <div style={{ fontSize: 13, color: MUTE, fontStyle: 'italic' }}>{it.tag}</div>
          </div>
        ))}
      </div>
      <MiniFoot />
    </div>
  );
}

// ─── info page ──────────────────────────────────────────────
function Info({ nav }) {
  return (
    <div>
      <div style={{ padding: '40px 48px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 56 }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: MUTE, letterSpacing: '.08em', textTransform: 'uppercase' }}>← info / about the room</div>
          <h2 style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 56, letterSpacing: '-.04em', margin: '12px 0 18px', lineHeight: 1.02 }}>
            hi, i&apos;m ayesha. i make ecosystems of experience.
          </h2>
          <p style={{ fontSize: 19, lineHeight: 1.55, maxWidth: '50ch', margin: 0 }}>
            i blend experimental graphic design, music production, poetry, and software into projects that are usually small, sometimes useless, occasionally moving. the tea room is where i put all of them while they finish brewing.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.55, maxWidth: '50ch', marginTop: 18, color: 'rgba(26,20,20,.7)' }}>
            most of these apps were vibe-coded in an evening or two. some never get finished. that&apos;s the point — the marketplace is the journal. come back in a few days, there&apos;ll be another room.
          </p>

          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <ArrowLink onClick={() => nav('work')} size={22}>see what&apos;s open</ArrowLink>
            <ArrowLink onClick={() => nav('play')} size={22}>poke at the scraps</ArrowLink>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <InfoCard title="elsewhere" rows={[['are.na', '↗'], ['github', '↗'], ['letters (substack)', '↗'], ['email', 'hello @ tea.room']]} />
          <InfoCard title="now (may 2026)" rows={[['reading', 'le guin essays'], ['listening', 'arthur russell loops'], ['making', 'lullaby machine'], ['drinking', 'genmaicha, lots']]} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 22px', border: `1px solid ${RULE}`, borderRadius: 4 }}>
            <Blob size={48} color={INK} variant="spiral" />
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

function InfoCard({ title, rows }) {
  return (
    <div style={{ border: `1px solid ${RULE}`, borderRadius: 4, padding: 20 }}>
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

Object.assign(window, { Prototype });
