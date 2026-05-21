// Three landing-page layouts. All static, all reference-faithful but
// distinct in composition. Each is a self-contained component sized to
// fill its artboard (1280×900).

// ─── Variant A — "Editorial Statement" ────────────────────────
// Closest to the reference: monospace nav, oversized declarative
// paragraph filling the hero, marquee strip, then a footer row of arrow
// links + doodle + tagline + outbound links.

function LandingA({ onNav }) {
  return (
    <div style={{ width: '100%', height: '100%', background: PINK, color: INK, display: 'flex', flexDirection: 'column', fontFamily: 'var(--display)' }}>
      <TopNav onNav={onNav} />

      {/* hero */}
      <div style={{ padding: '56px 48px 48px', flex: 1 }}>
        <h1 style={{
          fontFamily: 'var(--display)',
          fontWeight: 500,
          fontSize: 72,
          lineHeight: 1.02,
          letterSpacing: '-.035em',
          margin: 0,
          textWrap: 'pretty',
          maxWidth: '17ch',
        }}>
          ayesha is a designer in a tiny apartment who builds soft small worlds — apps that hum, hold, and bloom — somewhere between graphic design, music, poetry, and code.
        </h1>
      </div>

      <Marquee items={[...APPS.map((a) => a.title), ...SOON.map((s) => s.title), 'tea room', 'worry jar', 'pocket garden']} />

      {/* foot row */}
      <div style={{ padding: '36px 48px 28px', display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: 56, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <ArrowLink onClick={() => onNav && onNav('work')}>Work</ArrowLink>
          <ArrowLink onClick={() => onNav && onNav('play')}>Play</ArrowLink>
          <ArrowLink onClick={() => onNav && onNav('info')}>Info</ArrowLink>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <Doodle size={130} color={INK} />
          <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-.02em', lineHeight: 1.1, maxWidth: '20ch' }}>
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

// ─── Variant B — "Wordmark + Index" ──────────────────────────
// Massive name as a wordmark, intro tucked under it, three apps listed
// as oversized clickable rows on the right.

function LandingB({ onNav }) {
  return (
    <div style={{ width: '100%', height: '100%', background: PINK, color: INK, display: 'flex', flexDirection: 'column', fontFamily: 'var(--display)' }}>
      <TopNav onNav={onNav} center="ay/room" left="est. 2026 — currently steeping" />

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 0 }}>
        {/* left: wordmark + intro */}
        <div style={{ padding: '44px 40px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: `1px solid ${RULE}` }}>
          <div>
            <div style={{
              fontFamily: 'var(--display)',
              fontWeight: 500,
              fontSize: 168,
              lineHeight: .88,
              letterSpacing: '-.06em',
              margin: 0,
            }}>
              ayesha<br />makes<br /><span style={{ fontStyle: 'italic', color: 'transparent', WebkitTextStroke: `1.5px ${INK}` }}>rooms.</span>
            </div>
            <p style={{
              marginTop: 28, maxWidth: '34ch',
              fontFamily: 'var(--display)', fontWeight: 400, fontSize: 18, lineHeight: 1.45, letterSpacing: '-.005em',
            }}>
              experimental graphic design, music production, poetry, and software, braided together. each project is a small ecosystem you can sit inside for a minute.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
            <Blob size={48} color={INK} variant="spiral" />
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: MUTE, maxWidth: 360, lineHeight: 1.5 }}>
              new app every few days — sometimes finished, sometimes not. the marketplace is the journal.
            </div>
          </div>
        </div>

        {/* right: app index */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '28px 32px 16px', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 12, color: MUTE, borderBottom: `1px solid ${RULE}` }}>
            <span>currently in the room</span>
            <span>{APPS.length} apps · {SOON.length} brewing</span>
          </div>

          {APPS.map((app) => (
            <a key={app.slug} href="#" onClick={(e) => { e.preventDefault(); onNav && onNav('app:' + app.slug); }}
               style={{ textDecoration: 'none', color: INK, padding: '22px 32px', borderBottom: `1px solid ${RULE}`, display: 'block', cursor: 'pointer', transition: 'background .15s' }}
               onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,.35)')}
               onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: MUTE, width: 28 }}>{app.n}</span>
                <span style={{ fontSize: 38, fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1 }}>{app.title}</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 12, color: MUTE }}>{app.year} →</span>
              </div>
              <div style={{ marginTop: 8, paddingLeft: 46, fontSize: 15, color: MUTE, fontStyle: 'italic', letterSpacing: '-.005em' }}>
                {app.tag}
              </div>
            </a>
          ))}

          {SOON.map((s) => (
            <div key={s.slug} style={{ padding: '16px 32px', borderBottom: `1px solid ${RULE}`, display: 'flex', alignItems: 'center', gap: 18, opacity: .5 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: MUTE, width: 28 }}>—</span>
              <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-.02em' }}>{s.title}</span>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 11, color: MUTE }}>brewing</span>
            </div>
          ))}
        </div>
      </div>

      <Marquee items={['portfolio', 'marketplace', 'apps', 'softwares', 'tiny worlds', 'rituals', 'ayesha', 'studio of one']} height={36} />
    </div>
  );
}

// ─── Variant C — "Split Manifesto" ───────────────────────────
// Three-column grid that reads like a magazine spread: tall wordmark,
// running paragraph, and a numbered list of works.

function LandingC({ onNav }) {
  return (
    <div style={{ width: '100%', height: '100%', background: PINK, color: INK, display: 'flex', flexDirection: 'column', fontFamily: 'var(--display)' }}>
      <TopNav onNav={onNav} left="vol. 1 — soft software" right={['Index', 'Letters', 'Colophon']} />

      {/* marquee at top this time — sets a frame */}
      <Marquee items={[...APPS.map((a) => `${a.n}  ${a.title}`), ...SOON.map((s) => `··  ${s.title}`)]} height={36} dot="——" />

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 56, padding: '48px 48px 24px', alignItems: 'flex-start' }}>
        {/* vertical wordmark */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
          <div style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontFamily: 'var(--display)',
            fontWeight: 500,
            fontSize: 120,
            letterSpacing: '-.05em',
            lineHeight: .85,
          }}>
            ayesha&apos;s<br />tea room
          </div>
          <Blob size={56} color={INK} variant="knot" />
        </div>

        {/* middle: running paragraph + arrows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 520 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: MUTE, letterSpacing: '.08em', textTransform: 'uppercase' }}>
            from the editor —
          </div>
          <p style={{
            margin: 0,
            fontFamily: 'var(--display)',
            fontSize: 32,
            lineHeight: 1.18,
            letterSpacing: '-.022em',
            fontWeight: 400,
            textWrap: 'pretty',
          }}>
            a tea room is not a store. it&apos;s a small room with soft things in it and a kettle that is almost always on. these are the apps i&apos;ve made — half of them might be impractical, all of them feel like somewhere to sit.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, marginTop: 8 }}>
            <ArrowLink onClick={() => onNav && onNav('work')} size={20}>browse the index</ArrowLink>
            <ArrowLink onClick={() => onNav && onNav('info')} size={20}>about the room</ArrowLink>
            <ArrowLink onClick={() => onNav && onNav('app:tea-room')} size={20}>open today&apos;s pot</ArrowLink>
          </div>
        </div>

        {/* right: numbered table of contents */}
        <div style={{ minWidth: 280, display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: MUTE, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 14 }}>
            contents —
          </div>
          {APPS.map((app) => (
            <a key={app.slug} href="#" onClick={(e) => { e.preventDefault(); onNav && onNav('app:' + app.slug); }}
               style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 14, alignItems: 'baseline',
                 padding: '14px 0', borderBottom: `1px dotted ${RULE}`, color: INK, textDecoration: 'none' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: MUTE }}>{app.n}</span>
              <span style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-.02em' }}>{app.title}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: MUTE }}>p. 0{app.n.replace('0', '')}</span>
            </a>
          ))}
          <div style={{ marginTop: 14, fontFamily: 'var(--mono)', fontSize: 11, color: MUTE, lineHeight: 1.6 }}>
            also brewing —<br />
            {SOON.map((s) => s.title).join(', ')}.
          </div>
        </div>
      </div>

      <MiniFoot extra="vol. 1 / iss. 03 — refreshes every few days" />
    </div>
  );
}

Object.assign(window, { LandingA, LandingB, LandingC });
