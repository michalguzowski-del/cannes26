const { useState, useEffect, useRef, useMemo } = React;

/* ============================================================
   DATA
   ============================================================ */
const CREW = [
{ name: "Piotr Prajsnar", role: "CEO, Cloud Technologies", img: "https://ucarecdn.com/43a7886f-86b8-4b78-9599-f1b5eea6d342/", linkedin: "https://www.linkedin.com/in/piotrprajsnar/" },
{ name: "Mac Sawa", role: "CEO, OnAudience", img: "https://ucarecdn.com/fd936537-3bd4-456d-abe4-d74a3a062096/", linkedin: "https://www.linkedin.com/in/macsawa/" },
{ name: "Łukasz Kapuśniak", role: "CTO, OnAudience", img: "https://ucarecdn.com/69049a71-b9af-48b7-a8e6-d1162bfbb833/", linkedin: "https://www.linkedin.com/in/lukaszkapusniak/" },
{ name: "Karolina Miłkowska", role: "Head of Business Development", img: "img/karolina-new.jpg", linkedin: "https://www.linkedin.com/in/karolinamilkowska/" },
{ name: "Monika Szutko", role: "Business Development Manager", img: "https://ucarecdn.com/194ee708-2612-495f-9c1c-14930347e119/", linkedin: "https://www.linkedin.com/in/monikaszutko/" },
{ name: "Natalia Parczała", role: "Business Development Manager", img: "https://ucarecdn.com/6aec82f9-0dfd-4658-b25b-9e256fa19525/", linkedin: "https://www.linkedin.com/in/nataliaparczala/" },
{ name: "Dharmesh Patel", role: "Global Curation Strategy Lead", img: "img/dharmesh-patel.jpg", linkedin: "https://www.linkedin.com/in/darthmesh/" },
{ name: "Adrian Montero", role: "Global Partnerships & Strategy", img: "img/adrian-montero.jpg", linkedin: "https://www.linkedin.com/in/mradrianmontero/" }];


const GALLERY = [
"img/big-data-yacht-hero.jpg",
"img/emilka-yacht.jpg",
"img/crew-group.jpg",
"img/crew-table.jpg",
"img/helm-duo.jpg",
"img/crew-talk.jpg",
"https://images.assets-landingi.com/uc/dfba8f18-9689-4db3-bbb2-601a87736807/WhatsAppImage20240617at13743PM.jpeg",
"https://images.assets-landingi.com/uc/901f3b4a-033c-4a1e-b51f-d7cc2c07df6a/Screenshot20250522at141831.png",
"https://images.assets-landingi.com/uc/7f80813d-81cc-4270-823a-ebb4fd107661/WhatsAppImage20240617at30220PM1.jpeg",
"https://images.assets-landingi.com/uc/17190707-a94d-4313-9da4-8c594eb7fcef/c4df3aa648d847b585d25bfd3a9cf516.jpg",
"https://images.assets-landingi.com/uc/5f599e81-346f-4d59-ac62-a05cfac4ebf0/26e987cdb3534d539380e4227bcc724d.jpg",
"https://images.assets-landingi.com/uc/988320dd-fe78-4ad3-abc2-b40c383dd01e/5746f6a647214515b958b2175b8e73d9.JPG"];


const HERO_IMG = "img/big-data-yacht-hero.jpg";
const EXPECT_IMG = "img/reimagined.jpg";
const VIDEO_POSTER = "https://images.assets-landingi.com/uc/7f80813d-81cc-4270-823a-ebb4fd107661/WhatsAppImage20240617at30220PM1.jpeg";

const SLOTS = [
{ day: "June 22", date: "Mon", time: "10 AM — 12 PM", id: "22-am" },
{ day: "June 22", date: "Mon", time: "2 PM — 4 PM", id: "22-pm" },
{ day: "June 23", date: "Tue", time: "10 AM — 12 PM", id: "23-am" },
{ day: "June 23", date: "Tue", time: "2 PM — 4 PM", id: "23-pm" },
{ day: "June 24", date: "Wed", time: "10 AM — 12 PM", id: "24-am" },
{ day: "June 24", date: "Wed", time: "2 PM — 4 PM", id: "24-pm" }];


const EXPECT = [
{ lead: "No decks, no presentations.", rest: "Every conversation on board starts with a real question, not a pitch." },
{ lead: "Small group, open sea —", rest: "the kind of setting where deals get done and partnerships actually stick." },
{ lead: "Behavioral data at scale.", rest: "No buzzwords - just numbers that move markets." },
{ lead: "Instead of rooftop parties,", rest: "we sail — and that changes everything." },
{ lead: "Private by design.", rest: "An invite that doesn't end up on a public LinkedIn feed. Memorable by nature." },
{ lead: "Leave with more than a card.", rest: "Leave with a conversation worth continuing." }];


const ABOUT = [
{ lead: "A clear roadmap for revenue growth,", rest: "not just dashboards." },
{ lead: "Behavioral signals that keep AI accurate", rest: "— free from data noise that skews results." },
{ lead: "Non-obvious audience niches", rest: "your competitors haven't found yet." },
{ lead: "Privacy is our standard,", rest: "not a constraint — GDPR and Privacy-First by default." },
{ lead: "Behavioral evidence to reduce risk", rest: "and justify every dollar of media spend." },
{ lead: "Connecting data, platforms and partners", rest: "so the whole stack performs better together." }];


const ABOUT_ICONS = [
// 1. Roadmap
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20c3-1 3-4 6-4s3 3 6 3 4-3 4-3" />
    <circle cx="6" cy="6" r="2.2" />
    <path d="M6 8.2V16" strokeDasharray="2 2" />
    <path d="M18 13V7" strokeDasharray="2 2" />
    <circle cx="18" cy="6" r="2.2" />
  </svg>,
// 2. AI signals / brain chip
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <path d="M9 10h6M9 14h6M12 10v4" />
    <path d="M3 9h3M3 15h3M18 9h3M18 15h3M9 3v3M15 3v3M9 18v3M15 18v3" />
  </svg>,
// 3. Target / niches
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" />
  </svg>,
// 4. Privacy / shield
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />
    <path d="M9 12l2.5 2.5L15.5 10" />
  </svg>,
// 5. Evidence / chart up
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19h16" />
    <path d="M4 15l4-5 4 3 6-8" />
    <path d="M14 4h4v4" />
  </svg>,
// 6. Connect / nodes
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="6" r="2.2" />
    <circle cx="19" cy="6" r="2.2" />
    <circle cx="12" cy="18" r="2.2" />
    <path d="M7 7.5l4 8.5M17 7.5l-4 8.5M7 6h10" />
  </svg>];



/* ============================================================
   ICONS
   ============================================================ */
const Arrow = () =>
<svg className="arrow" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.2" />
  </svg>;


const Mark = () =>
<svg viewBox="0 0 24 24" fill="none" width="22" height="22">
    <path d="M12 2L12 22M2 12L22 12M4.93 4.93L19.07 19.07M19.07 4.93L4.93 19.07" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>;

const OALogo = ({ height = 22 }) =>
<svg height={height} viewBox="0 0 240 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="20" cy="20" r="7" fill="currentColor" />
    <text x="48" y="27" fontFamily="Inter Tight, system-ui, sans-serif" fontSize="22" fontWeight="700" letterSpacing="-0.015em" fill="currentColor">OnAudience</text>
  </svg>;


const Compass = () =>
<svg viewBox="0 0 96 96" width="96" height="96" fill="none">
    <circle cx="48" cy="48" r="46" stroke="currentColor" strokeWidth="1" />
    <circle cx="48" cy="48" r="36" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    <path d="M48 14 L52 48 L48 82 L44 48 Z" fill="currentColor" />
    <path d="M14 48 L48 44 L82 48 L48 52 Z" fill="currentColor" opacity="0.5" />
    <circle cx="48" cy="48" r="3" fill="currentColor" />
    <text x="48" y="10" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fill="currentColor">N</text>
    <text x="48" y="92" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fill="currentColor">S</text>
  </svg>;


const Play = () =>
<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>;


/* ============================================================
   NAV
   ============================================================ */
function Nav({ onTweaks, tweaksAvail, direction, onVersion }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on);
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="nav-brand">
          <img src="img/logo-onaudience.png" alt="OnAudience" className="nav-logo" style={{ opacity: "2", objectFit: "contain" }} />
          <span className="nav-divider">|</span>
          <span className="nav-sub">Big Data Yacht</span>
        </a>
        <div className="nav-links">
          <a href="#experience">The Experience</a>
          <a href="#crew">Crew</a>
          <a href="#film">Film</a>
          <a href="#about">About OnAudience</a>
        </div>
        <div className="nav-right">
          <div className="version-toggle" title="Switch design version">
            <button className={direction === 'meridian' ? 'active' : ''} onClick={() => onVersion('meridian')}>Meridian</button>
            <button className={direction === 'paper' ? 'active' : ''} onClick={() => onVersion('paper')}>Paper</button>
          </div>
          <a href="#register" className="nav-cta">Register interest <span style={{ marginLeft: 10 }}>→</span></a>
        </div>
      </div>
    </nav>);

}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ variant }) {
  return (
    <header className={`hero variant-${variant}`} id="top">
      <div className="hero-inner">
        <div className="hero-left">
          <div>
            <h1>
              Maritime Suite<br />
              Agency <span className="amp">&amp;</span> Brand<br />
              Decision Makers.
            </h1>
            <p className="hero-tag">
              A curated experience for industry leaders. Premium networking,
              scenic views, and the kind of conversation that doesn't happen on shore.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 56, flexWrap: "wrap" }}>
              <a href="#register" className="btn" style={{ color: "rgb(255, 255, 255)", fontFamily: "Inter", fontSize: "15px" }}>Register interest <Arrow /></a>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-img">
            <video
              className="hero-video"
              src="img/hero-film.mp4"
              autoPlay loop muted playsInline
              poster={HERO_IMG} />
            
          </div>
        </div>
      </div>

      <div className="hero-foot-wrap">
        <div className="wrap">
          <div className="hero-foot">
            <div className="cell">
              <span className="cell-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="5" width="18" height="16" rx="1" /><path d="M3 9h18M8 3v4M16 3v4" /><circle cx="8" cy="14" r="1" fill="currentColor" /><circle cx="12" cy="14" r="1" fill="currentColor" /><circle cx="16" cy="14" r="1" fill="currentColor" /></svg></span>
              <span className="label">Dates</span><span className="val">Jun 22 — 26</span>
            </div>
            <div className="cell">
              <span className="cell-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="9" /><path d="M12 3v9l5 3" /></svg></span>
              <span className="label">Cruises</span>
              <span className="val">
                <span className="val-slot"><span className="val-slot-kind">Morning</span>10 AM</span>
                <span className="val-sep">·</span>
                <span className="val-slot"><span className="val-slot-kind">Afternoon</span>2 PM</span>
              </span>
            </div>
            <div className="cell">
              <span className="cell-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 2v4M4.9 4.9l2.8 2.8M2 12h4M4.9 19.1l2.8-2.8M12 22v-4M19.1 19.1l-2.8-2.8M22 12h-4M19.1 4.9l-2.8 2.8" /><circle cx="12" cy="12" r="3" /></svg></span>
              <span className="label">Duration</span><span className="val">± 2 hours</span>
            </div>
            <div className="cell">
              <span className="cell-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 3v13" /><path d="M6 10l6-7 6 7" /><path d="M3 16c2 2 4 2 4.5 2s2.5 0 4.5-2c2 2 4 2 4.5 2s2.5 0 4.5-2" /><path d="M3 20c2 2 4 2 4.5 2s2.5 0 4.5-2c2 2 4 2 4.5 2s2.5 0 4.5-2" /></svg></span>
              <span className="label">Vessel</span><span className="val">Beneteau First 53</span>
            </div>
          </div>
        </div>
      </div>
    </header>);

}

/* ============================================================
   MARQUEE
   ============================================================ */
function Marquee() {
  const items = ["Cannes Lions 2026", "By invitation only", "22 — 26 June", "A private maritime forum", "Beneteau First 53", "Port de Cannes"];
  const doubled = [...items, ...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((x, i) =>
        <React.Fragment key={i}>
            <span>{x}</span>
            <span className="sep">✦</span>
          </React.Fragment>
        )}
      </div>
    </div>);

}

/* ============================================================
   WHY SECTION
   ============================================================ */
function Why() {
  return (
    <section id="experience" className="anchor-offset">
      <div className="wrap">
        <div className="two-col" style={{ fontFamily: "Inter" }}>
          <div>
            <h2 className="section-title">
              Not a venue.<br />
              <span className="gold">A floating home</span><br />
              for meaningful<br />
              conversation.
            </h2>
          </div>
          <div>
            <div className="prose">
              <p style={{ fontSize: "19px" }}>
                Owned and operated by the OnAudience leadership team, the
                Beneteau First 53 is crewed by our own people — sailing
                skippers alongside friends from the industry. Throughout the year,
                OnAudience team members join her cruises as part of our company culture.
              </p>
              <p>
                Every June, she makes her way to Cannes — just in time for Cannes
                Lions — to host our partners, clients, and collaborators on the
                French Riviera. While Cannes Lions buzzes on shore, you'll be
                sailing the Mediterranean with the people who drive the industry
                forward.
              </p>
            </div>
          </div>
        </div>

        <div className="why-pillars why-tiles">
              <div className="pillar">
                <span className="pillar-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="8" r="3" /><circle cx="16" cy="16" r="3" /><path d="M10.5 9.5l3 5" />
                  </svg>
                </span>
                <span className="pt">Senior leaders in data, technology, and marketing.</span>
              </div>
              <div className="pillar">
                <span className="pillar-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 5h11a3 3 0 013 3v3a3 3 0 01-3 3H8l-4 3V5z" /><path d="M10 17h10v3l-3-2H10v-1z" />
                  </svg>
                </span>
                <span className="pt">Deeper, distraction-free conversations.</span>
              </div>
              <div className="pillar">
                <span className="pillar-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" />
                  </svg>
                </span>
                <span className="pt">How OnAudience fuels global data excellence.</span>
              </div>
              <div className="pillar">
                <span className="pillar-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18c2 1 4 1 6 0s4-1 6 0 4 1 6 0" /><path d="M3 14c2 1 4 1 6 0s4-1 6 0 4 1 6 0" /><path d="M12 11V3l5 4" />
                  </svg>
                </span>
                <span className="pt">Enjoy Cannes from a sea view.</span>
              </div>
            </div>
      </div>
    </section>);

}

/* ============================================================
   EXPECT
   ============================================================ */
function Expect() {
  return (
    <section style={{ padding: "0" }}>
      <div className="wrap">
        <div className="expect">
          <div className="expect-left" style={{ fontWeight: "400" }}>
            <h2>
              <em style={{ color: "#00acec", fontFamily: '"Fraunces", serif' }}>Business reimagined on water.</em><br />
              No slides. No panels.<br />
              Just the right conversation.
            </h2>
            <ul className="expect-list">
              {EXPECT.map((e, i) =>
              <li key={i}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <span><strong>{e.lead}</strong> {e.rest}</span>
                </li>
              )}
            </ul>
          </div>
          <div className="expect-right expect-right-stack">
            <div className="expect-img" style={{ backgroundImage: `url(${EXPECT_IMG})` }} />
            <div className="expect-img" style={{ backgroundImage: `url(img/reimagined2.jpg)` }} />
          </div>
        </div>
      </div>
    </section>);

}

/* ============================================================
   CREW
   ============================================================ */
function Crew() {
  return (
    <section id="crew" className="anchor-offset">
      <div className="wrap">
        <div className="crew-header">
          <div>
            <h2 className="section-title">
              Seven people.<br />
              <span className="gold">One horizon.</span>
            </h2>
          </div>
          <p style={{ width: "535px" }}>
            Your hosts are senior operators at OnAudience and Cloud Technologies.
            They sail. They trade stories. And occasionally, they talk business.
          </p>
        </div>
        <div className="crew-grid">
          {CREW.map((p, i) =>
          <div className="crew-card" key={i}>
              <div className="crew-photo" style={{ backgroundImage: `url(${p.img})` }}>
                {p.linkedin &&
              <a className="crew-li-hover" href={p.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn — ${p.name}`}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.44v6.3zM5.34 7.43a2.06 2.06 0 11.02-4.12 2.06 2.06 0 01-.02 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .78 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .78 23.21 0 22.23 0z" />
                    </svg>
                  </a>
              }
              </div>
              <div className="crew-meta">
                <div className="crew-name">{p.name}</div>
                <div className="crew-role">{p.role}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ============================================================
   VIDEO
   ============================================================ */
function Film() {
  const [unmuted, setUnmuted] = useState(false);
  const ref = useRef(null);
  const toggleSound = () => {
    const v = ref.current;if (!v) return;
    v.muted = !v.muted;
    setUnmuted(!v.muted);
    if (!v.muted) v.play().catch(() => {});
  };
  return (
    <section id="film" className="anchor-offset" style={{ paddingTop: 80 }}>
      <div className="wrap">
        <div className="two-col" style={{ alignItems: "end", marginBottom: 24 }}>
          <div>
            <h2 className="section-title">Four minutes<br /><span className="gold">on open water.</span></h2>
          </div>
          <p className="prose" style={{ marginBottom: 8 }}>
            A short film from last year's voyage — the light, the people,
            the Riviera. No narration needed.
          </p>
        </div>

        <div className="video-wrap">
          <video ref={ref} autoPlay loop muted playsInline
          src="img/hero-film.mp4"
          poster={VIDEO_POSTER} />
          <button type="button" onClick={toggleSound}
          style={{
            position: "absolute", right: 16, bottom: 16, zIndex: 3,
            width: 48, height: 48, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.5)",
            background: "rgba(0,0,0,0.4)", color: "#fff",
            cursor: "pointer", display: "grid", placeItems: "center",
            backdropFilter: "blur(8px)"
          }}
          aria-label={unmuted ? "Mute" : "Unmute"}>
            {unmuted ?
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4zM14 3.23v2.06a7 7 0 010 13.42v2.06a9 9 0 000-17.54z" />
              </svg> :

            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12A4.5 4.5 0 0014 8.04v2.21l2.45 2.45a4.5 4.5 0 00.05-.7zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.95 8.95 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.17v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            }
          </button>
        </div>
      </div>
    </section>);

}

/* ============================================================
   GALLERY
   ============================================================ */
function Gallery() {
  const [open, setOpen] = useState(-1);
  // -1 = closed, -3 = expect film, 0..N = gallery photo
  const SEQ = [-3, ...GALLERY.map((_, i) => i)];
  const close = () => setOpen(-1);
  const prev = (e) => {if (e) e.stopPropagation();setOpen((cur) => {
      const idx = SEQ.indexOf(cur);
      return SEQ[(idx - 1 + SEQ.length) % SEQ.length];
    });};
  const next = (e) => {if (e) e.stopPropagation();setOpen((cur) => {
      const idx = SEQ.indexOf(cur);
      return SEQ[(idx + 1) % SEQ.length];
    });};

  useEffect(() => {
    if (open === -1) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();else
      if (e.key === 'ArrowLeft') prev();else
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <section id="film" className="anchor-offset" style={{ paddingTop: 80 }}>
      <div className="wrap">
        <div className="two-col" style={{ alignItems: "end", marginBottom: 24 }}>
          <div>
            <h2 className="section-title">See how <span className="gold">it feels.</span></h2>
          </div>
          <p className="prose" style={{ marginBottom: 8 }}>
            A short film and scenes from last June — the team, the guests,
            the Riviera. Click any frame to open larger.
          </p>
        </div>

        <div className="gallery-wrap">
          <div
            className="g-video-big"
            aria-label="Voyage video"
            onClick={() => setOpen(-3)}>
            <video
              src="img/expect-video.mp4"
              autoPlay loop muted playsInline />
            
          </div>
          <div className="gallery-side">
            {GALLERY.map((src, i) =>
            <div
              key={i}
              className={`g g-${i + 1}`}
              style={{ backgroundImage: `url(${src})`, cursor: 'zoom-in' }}
              onClick={() => setOpen(i)} />
            )}
          </div>
        </div>
      </div>

      {open !== -1 &&
      <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="lb-close" onClick={(e) => {e.stopPropagation();close();}} aria-label="Close">×</button>
          <button className="lb-nav lb-prev" onClick={prev} aria-label="Previous">‹</button>
          {open === -3 ?
        <video
          key="expect-film"
          className="lb-img"
          src="img/expect-video.mp4"
          autoPlay loop controls playsInline
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: '92vw', maxHeight: '88vh' }} /> :
        <img
          className="lb-img"
          src={GALLERY[open]}
          alt={`Photo ${open + 1} of ${GALLERY.length}`}
          onClick={(e) => e.stopPropagation()} />
        }
          <button className="lb-nav lb-next" onClick={next} aria-label="Next">›</button>
          <div className="lb-count">
            {open === -3 ? 'Film' : `${open + 1} / ${GALLERY.length}`}
          </div>
        </div>
      }
    </section>);

}

/* ============================================================
   ABOUT
   ============================================================ */
function About() {
  return (
    <section id="about" className="anchor-offset">
      <div className="wrap">
        <div className="two-col">
          <div>
            <h2 className="section-title">
              A global<br />
              <span className="gold">data provider.</span>
            </h2>
          </div>
          <div>
            <div className="prose">
              <p>
                OnAudience is a global data provider. We offer privacy-safe,
                high-quality data audiences at scale, fueling digital campaigns
                and business solutions worldwide.
              </p>
              <p>
                We help brands and agencies turn behavioral data into decisions
                that drive real business outcomes — not just dashboards.
              </p>
            </div>
          </div>
        </div>

        <div className="about-mag why-tiles">
              {ABOUT.map((a, i) =>
          <div className="pillar" key={i}>
                  <span className="pillar-icon" aria-hidden="true">{ABOUT_ICONS[i]}</span>
                  <span className="pt">{a.lead} {a.rest}</span>
                </div>
          )}
            </div>

        <Stats />
      </div>
    </section>);

}

function Stats() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let tx = 0,ty = 0,cx = 0,cy = 0,raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--mx", cx + "px");
      el.style.setProperty("--my", cy + "px");
      if (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    el.addEventListener("mousemove", onMove);
    return () => {el.removeEventListener("mousemove", onMove);if (raf) cancelAnimationFrame(raf);};
  }, []);
  return (
    <div className="stats stats-light" ref={ref} style={{ "--mx": "776.7179898517586px", "--my": "2.6073555089275966px" }}>
      <div className="stat">
        <div className="num">25<sup>B+</sup></div>
        <div className="lbl">devices worldwide</div>
      </div>
      <div className="stat">
        <div className="num">200<sup>+</sup></div>
        <div className="lbl">markets covered</div>
      </div>
      <div className="stat">
        <div className="num">3,000<sup>+</sup></div>
        <div className="lbl">predefined segments</div>
      </div>
    </div>);

}

/* ============================================================
   FORM (multi-step)
   ============================================================ */
const COMPANY_TYPES = [
"Brand / Advertiser", "Media Agency", "Creative Agency",
"Publisher / Media Owner", "Ad Tech / Mar Tech", "Data Provider",
"Consultancy", "Retail / E-commerce", "Other"];


function Form() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    name: "", email: "", company: "", title: "",
    companyType: "", why: "", linkedin: "",
    slots: [], consent: false
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (!data.name.trim()) e.name = "Required";
      if (!data.email.trim()) e.email = "Required";else
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Enter a valid email";
      if (!data.company.trim()) e.company = "Required";
      if (!data.title.trim()) e.title = "Required";
    } else if (s === 1) {
      if (!data.companyType) e.companyType = "Please choose one";
      if (!data.why.trim() || data.why.trim().length < 10) e.why = "Tell us a little more (min 10 chars)";
    } else if (s === 2) {
      if (!data.slots || data.slots.length === 0) e.slots = "Pick at least one cruise";
      if (!data.consent) e.consent = "Required to proceed";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {if (validate(step)) setStep((s) => s + 1);};
  const back = () => setStep((s) => Math.max(0, s - 1));
  const submit = () => {if (validate(2)) setSubmitted(true);};

  const slotLabel = useMemo(() => {
    if (!data.slots || data.slots.length === 0) return "";
    return data.slots.
    map((id) => {
      const s = SLOTS.find((x) => x.id === id);
      return s ? `${s.day}, ${s.time}` : "";
    }).
    filter(Boolean).
    join(" · ");
  }, [data.slots]);

  const toggleSlot = (id) => {
    setData((d) => {
      const has = d.slots.includes(id);
      return { ...d, slots: has ? d.slots.filter((x) => x !== id) : [...d.slots, id] };
    });
  };

  if (submitted) {
    return (
      <div className="form-card">
        <div className="form-success">
          <div className="seal"><Compass /></div>
          <h3>You're on the list.</h3>
          <p>Our team will confirm your slot within 48 hours.<br />
          Expect a note from <em>crew@onaudience.com</em>.</p>
          <div className="summary">
            <div><strong>{data.name}</strong> · {data.company}</div>
            <div>Cruise{data.slots.length > 1 ? 's' : ''}: <strong>{slotLabel}</strong></div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="form-card">
      <div className="form-stepper">
        <div className={`step ${step === 0 ? "active" : step > 0 ? "done" : ""}`}>
          <span className="dot">1</span>
          <span className="step-label">You</span>
        </div>
        <div className={`bar ${step > 0 ? "done" : ""}`} />
        <div className={`step ${step === 1 ? "active" : step > 1 ? "done" : ""}`}>
          <span className="dot">2</span>
          <span className="step-label">Your company</span>
        </div>
        <div className={`bar ${step > 1 ? "done" : ""}`} />
        <div className={`step ${step === 2 ? "active" : step > 2 ? "done" : ""}`}>
          <span className="dot">3</span>
          <span className="step-label">Your cruise</span>
        </div>
      </div>

      {step === 0 &&
      <div>
          <div className="row-2">
            <div className={`field ${errors.name ? "error" : ""}`}>
              <label>Full name *</label>
              <input type="text" value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="Jane Doe" />
              <div className="err">{errors.name}</div>
            </div>
            <div className={`field ${errors.email ? "error" : ""}`}>
              <label>Company e-mail *</label>
              <input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@company.com" />
              <div className="err">{errors.email}</div>
            </div>
          </div>
          <div className="row-2">
            <div className={`field ${errors.company ? "error" : ""}`}>
              <label>Company *</label>
              <input type="text" value={data.company} onChange={(e) => set("company", e.target.value)} placeholder="Acme Holdings" />
              <div className="err">{errors.company}</div>
            </div>
            <div className={`field ${errors.title ? "error" : ""}`}>
              <label>Job title *</label>
              <input type="text" value={data.title} onChange={(e) => set("title", e.target.value)} placeholder="Chief Marketing Officer" />
              <div className="err">{errors.title}</div>
            </div>
          </div>
          <div className="field">
            <label>LinkedIn profile</label>
            <input type="url" value={data.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="linkedin.com/in/…" />
            <div className="err">&nbsp;</div>
          </div>
        </div>
      }

      {step === 1 &&
      <div>
          <div className={`field ${errors.companyType ? "error" : ""}`}>
            <label>Company type *</label>
            <select value={data.companyType} onChange={(e) => set("companyType", e.target.value)}>
              <option value="">Select your company type</option>
              {COMPANY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <div className="err">{errors.companyType}</div>
          </div>
          <div className={`field ${errors.why ? "error" : ""}`}>
            <label>Why do you want to join us? *</label>
            <textarea value={data.why} onChange={(e) => set("why", e.target.value)}
          placeholder="A few lines. What are you curious about, who would you like to meet, what's on your mind for Cannes?" />
            <div className="err">{errors.why}</div>
          </div>
        </div>
      }

      {step === 2 &&
      <div>
          <div className={`field ${errors.slots ? "error" : ""}`}>
            <label>Pick dates that suit you *</label>
            <div className="date-picker">
              {["June 22", "June 23", "June 24"].map((day) => {
              const daySlots = SLOTS.filter((s) => s.day === day);
              const isActive = daySlots.some((s) => data.slots.includes(s.id));
              return (
                <div key={day} className={`date-card ${isActive ? "active" : ""}`}>
                    <div className="date-head">
                      <div className="date-num">{day.split(" ")[1]}</div>
                      <div className="date-meta">
                        <div className="date-month">June 2026</div>
                        <div className="date-dow">{{ Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday" }[daySlots[0].date]}</div>
                      </div>
                    </div>
                    <div className="cruise-header">2 cruises available</div>
                    <div className="time-slots">
                      {daySlots.map((s, idx) => {
                      const isMorning = idx === 0;
                      return (
                        <button
                          type="button"
                          key={s.id}
                          className={`time-slot ${data.slots.includes(s.id) ? "selected" : ""} ${s.soldout ? "soldout" : ""}`}
                          disabled={s.soldout}
                          onClick={() => !s.soldout && toggleSlot(s.id)}>

                            <span className="time-slot-check" aria-hidden="true" />
                            <span className="time-slot-body">
                              <span className="time-slot-label">{isMorning ? "Morning cruise" : "Afternoon cruise"}</span>
                              <span className="time-slot-time">{s.time.split(" — ")[0]}</span>
                            </span>
                            {s.soldout && <span className="time-slot-tag">Sold out</span>}
                          </button>);

                    })}
                    </div>
                  </div>);

            })}
            </div>
            <div className="err" style={{ marginTop: 8 }}>{errors.slots}</div>
          </div>

          <div className={`consent ${errors.consent ? "" : ""}`}>
            <input id="cx" type="checkbox" checked={data.consent} onChange={(e) => set("consent", e.target.checked)} />
            <label htmlFor="cx">
              By registering, I agree to the terms and conditions of the Big
              Data Yacht Cruise and consent to the processing of my personal
              data by OnAudience Ltd for promotional communication purposes.
            </label>
          </div>
          {errors.consent && <div className="err" style={{ marginTop: -16, marginBottom: 16 }}>{errors.consent}</div>}
        </div>
      }

      <div className="form-actions">
        {step > 0 ?
        <button className="btn btn-ghost" onClick={back} type="button">
            <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}><Arrow /></span> Back
          </button> :
        <span />}
        <div className="spacer" />
        {step < 2 ?
        <button className="btn" onClick={next} type="button">
            Continue <Arrow />
          </button> :

        <button className="btn" onClick={submit} type="button">
            Register interest <Arrow />
          </button>
        }
      </div>
    </div>);

}

/* ============================================================
   FOLLOW ON LINKEDIN — CTA
   ============================================================ */
function FollowLinkedIn() {
  return (
    <section className="follow-cta">
      <div className="wrap">
        <div className="follow-cta-inner">
          <h2>Can't wait until <span className="gold" style={{ color: "rgb(0, 172, 236)" }}>June?</span></h2>
          <p>
            Follow OnAudience on LinkedIn for stories from the voyage,
            behavioral data insights, and behind-the-scenes from the crew —
            straight from the deck.
          </p>
          <div className="follow-cta-actions">
            <a
              className="btn"
              href="https://www.linkedin.com/company/onaudience/"
              target="_blank"
              rel="noopener noreferrer">
              <span>Follow on LinkedIn</span>
              <Arrow />
            </a>
            <a
              className="btn"
              href="https://www.onaudience.com"
              target="_blank"
              rel="noopener noreferrer">
              <span>Visit onaudience.com</span>
              <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>);

}

function Register() {
  return (
    <section id="register" className="form-section anchor-offset">
      <div className="wrap">
        <div className="form-grid">
          <div className="form-aside">
            <h2 className="section-title">Ready to<br /><span className="gold">come aboard?</span></h2>
            <p>
              Secure your place on the Big Data Yacht. Fill in the form and our
              team will confirm your slot. Spaces are strictly limited — don't
              wait too long.
            </p>
            <div className="dates">
              <div className="title">Available cruises</div>
              <ul className="cruise-days">
                {[
                { date: "22", month: "June", day: "Mon" },
                { date: "23", month: "June", day: "Tue" },
                { date: "24", month: "June", day: "Wed" }].
                map((d) =>
                <li key={d.date} className="cruise-day">
                    <div className="cruise-day-head">
                      <span className="cruise-day-num">{d.date}</span>
                      <span className="cruise-day-meta">
                        <span className="cruise-day-month">{d.month}</span>
                        <span className="cruise-day-dow">{d.day}</span>
                      </span>
                    </div>
                    <div className="cruise-day-slots">
                      <div className="cruise-chip">
                        <span className="cruise-chip-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="13" r="4" />
                            <path d="M12 4v2M4.6 7.6l1.4 1.4M18 9l1.4-1.4M3 13h2M19 13h2" />
                            <path d="M2 20h20" />
                          </svg>
                        </span>
                        <span className="cruise-chip-body">
                          <span className="cruise-chip-kind">Morning</span>
                          <span className="cruise-chip-time">10 AM</span>
                        </span>
                      </div>
                      <div className="cruise-chip">
                        <span className="cruise-chip-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 18h18" />
                            <path d="M6 18a6 6 0 0 1 12 0" />
                            <path d="M12 4v3M5 8l1.6 1.6M18 9.6L19.4 8" />
                          </svg>
                        </span>
                        <span className="cruise-chip-body">
                          <span className="cruise-chip-kind">Afternoon</span>
                          <span className="cruise-chip-time">2 PM</span>
                        </span>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
              <div className="title" style={{ marginTop: 24 }}>Each cruise</div>
              <ul className="cruise-info-list">
                <li>
                  <svg className="cruise-ico" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  <span>± 2 hours</span>
                </li>
                <li>
                  <svg className="cruise-ico" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 3h10l-1.2 9.2a4 4 0 0 1-3.97 3.5h-.66A4 4 0 0 1 7.2 12.2L6 3Z" />
                    <path d="M8.2 7h7.6" />
                    <path d="M12 15.7V21" />
                    <path d="M8.5 21h7" />
                  </svg>
                  <span>Soft drinks &amp; snacks</span>
                </li>
              </ul>
            </div>
          </div>
          <Form />
        </div>
      </div>
    </section>);

}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot foot-top">
          <div className="foot-col">
            <img src="img/logo-onaudience.png" alt="OnAudience" className="foot-logo" />
            <p style={{ margin: "20px 0 0" }}>Global data provider.<br />Privacy-first behavioral data at scale.</p>
          </div>
          <div className="foot-col">
            <h4>Voyage</h4>
            <a href="#experience">The experience</a>
            <a href="#crew">Meet the crew</a>
            <a href="#film">Film</a>
            <a href="#register">Reserve</a>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <a href="https://www.onaudience.com" target="_blank" rel="noreferrer">onaudience.com</a>
            <a href="#">Privacy</a>
            <a href="#">Contact</a>
          </div>
          <div className="foot-col">
            <h4>Bearings</h4>
            <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", margin: "8px 0 0" }}>
              43.5528° N<br />7.0174° E<br />Port de Cannes, FR
            </p>
          </div>
        </div>
        <div className="foot foot-bot">
          <span>© 2026 OnAudience Ltd. All rights reserved.</span>
          <span style={{ fontStyle: "italic" }}>Built by the crew, for the crew.</span>
        </div>
      </div>
    </footer>);

}

/* ============================================================
   TWEAKS PANEL
   ============================================================ */
function Tweaks({ cfg, setCfg, open, setOpen }) {
  const opt = (k, v, label) =>
  <button className={cfg[k] === v ? "active" : ""} onClick={() => setCfg({ ...cfg, [k]: v })}>{label}</button>;

  return (
    <div className={`tweaks ${open ? "open" : ""}`}>
      <div className="tweaks-head">
        <span>Tweaks</span>
        <button onClick={() => setOpen(false)}>×</button>
      </div>
      <div className="tweaks-body">
        <div className="tweaks-group">
          <div className="tweaks-label">Direction</div>
          <div className="tweaks-opts">
            {opt("direction", "atlantic", "Atlantic")}
            {opt("direction", "riviera", "Riviera")}
            {opt("direction", "paper", "Paper")}
            {opt("direction", "meridian", "Meridian")}
          </div>
        </div>
        <div className="tweaks-group">
          <div className="tweaks-label">Hero variant</div>
          <div className="tweaks-opts three">
            {opt("hero", "split", "Split")}
            {opt("hero", "editorial", "Editorial")}
            {opt("hero", "typographic", "Typography")}
          </div>
        </div>
      </div>
    </div>);

}

/* ============================================================
   APP
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "meridian",
  "hero": "split"
} /*EDITMODE-END*/;

function App() {
  const [cfg, setCfg] = useState(() => {
    try {
      const saved = localStorage.getItem("oa-yacht-cfg");
      return saved ? { ...TWEAK_DEFAULTS, ...JSON.parse(saved) } : TWEAK_DEFAULTS;
    } catch {return TWEAK_DEFAULTS;}
  });
  const [tweaksOpen, setTweaksOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-direction", cfg.direction);
    try {localStorage.setItem("oa-yacht-cfg", JSON.stringify(cfg));} catch {}
  }, [cfg]);

  // Tweaks protocol
  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setTweaksOpen(true);
      if (d.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // persist via host
  useEffect(() => {
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: cfg }, "*");
  }, [cfg]);

  // reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add("in");});
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [cfg]);

  return (
    <div>
      <Nav onTweaks={() => setTweaksOpen(true)} tweaksAvail direction={cfg.direction} onVersion={(v) => setCfg(c => ({ ...c, direction: v }))} />
      <Hero variant={cfg.hero} />
      <Marquee />
      <Why />
      <hr className="rule" />
      <Expect />
      <Crew />
      <hr className="rule" />
      <Gallery />
      <hr className="rule" />
      <About />
      <Register />
      <FollowLinkedIn />
      <Footer />
      <Tweaks cfg={cfg} setCfg={setCfg} open={tweaksOpen} setOpen={setTweaksOpen} />
    </div>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);