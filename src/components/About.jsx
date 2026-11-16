import { useEffect, useRef, useState } from "react";
import { stats, education, profile } from "../data.js";
import { config, asset } from "../config.js";
import Reveal from "./Reveal.jsx";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const start = () => {
      const t0 = performance.now();
      const dur = 1400;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(value * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (typeof IntersectionObserver === "undefined") {
      setN(value);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {n.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="section">
      <Reveal>
        <h2 className="section-title">
          About
        </h2>
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-text">
          <p>
            I'm a full-stack developer who leans into AI. At Bleu Iris Technologies I architect a
            multi-tenant logistics platform used by 50+ enterprise clients, covering freight,
            transport, warehousing, customs and finance, backed by PostgreSQL, React and GCP.
          </p>
          <p>
            My roots are in ML: I studied AI & ML engineering, built a BERT-based fake news
            detector, and now work with LLM applications, multi-agent systems and RAG alongside
            production web and Android apps.
          </p>
          <div className="edu">
            <h3>Education</h3>
            <p>
              <strong>{education.degree}</strong>
              <br />
              {education.school} · {education.period}
            </p>
            <ul>
              {education.certs.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <div className="about-side">
          <Reveal className="avatar-wrap">
            {config.photo ? (
              <img
                className="avatar"
                src={asset(config.photo)}
                alt={`Portrait of ${profile.name}`}
                width="160"
                height="160"
                loading="lazy"
              />
            ) : (
              <div className="avatar initials" role="img" aria-label={`${profile.name} avatar`}>
                {profile.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </div>
            )}
            <div>
              <strong>{profile.name}</strong>
              <div className="muted mono avatar-sub">{profile.location}</div>
            </div>
          </Reveal>
          <div className="stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="stat">
              <div className="stat-value">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="stat-label">{s.label}</div>
            </Reveal>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
