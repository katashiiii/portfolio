import { useState } from "react";
import { profile } from "../data.js";
import Reveal from "./Reveal.jsx";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="section contact">
      <Reveal>
        <p className="eyebrow center">
          <span className="accent">05.</span> What's next
        </p>
        <h2 className="contact-title">Let's build something.</h2>
        <p className="lead center">
          I'm available immediately and open to relocating. If you have a role in full-stack or AI
          engineering, I'd love to hear about it.
        </p>
        <div className="cta center">
          <button className="btn primary" onClick={copyEmail}>
            {copied ? "Copied ✓" : profile.email}
          </button>
          <a className="btn" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
            {profile.phone}
          </a>
        </div>
        <div className="cta center">
          <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </Reveal>
      <footer className="footer mono">
        © {new Date().getFullYear()} {profile.name} · Built with React + Vite
      </footer>
    </section>
  );
}
