import { useEffect, useState } from "react";
import { profile } from "../data.js";
import { config, asset } from "../config.js";
import Terminal from "./Terminal.jsx";

function useTypewriter(words, speed = 55, pause = 1600) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx % words.length];
    let delay = deleting ? speed / 2 : speed;
    if (!deleting && text === word) delay = pause;

    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIdx((i) => i + 1);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx, words, speed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section id="top" className="hero section">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="pulse" /> {profile.status}
        </p>
        <h1>
          Hi, I'm <span className="grad">{profile.name}</span>.
        </h1>
        <p className="typed" aria-label={profile.roles.join(", ")}>
          <span className="accent">&gt;</span> {typed}
          <span className="caret" />
        </p>
        <p className="lead">{profile.tagline}</p>
        <div className="cta">
          <a className="btn primary" href="#projects">
            View projects
          </a>
          <a className="btn" href={asset(config.cvFile)} download>
            Download CV ↓
          </a>
          <a className="btn ghost" href={`mailto:${profile.email}`}>
            Hire me
          </a>
          <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </div>
      <Terminal />
    </section>
  );
}
