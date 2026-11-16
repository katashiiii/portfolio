import { useEffect, useState } from "react";
import { testimonials, notes } from "../data.js";
import { config, asset } from "../config.js";

const links = [
  "about",
  "experience",
  "projects",
  "architecture",
  "skills",
  testimonials.length ? "testimonials" : null,
  notes.length ? "notes" : null,
  "contact",
].filter(Boolean);

export default function Nav({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <a href="#top" className="nav-logo">
        <span className="accent">~/</span>rithik
      </a>
      <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Primary">
        {links.map((id) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {id}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <a className="nav-cv" href={asset(config.cvFile)} download>
          CV ↓
        </a>
        <button
          className="icon-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          title="Toggle theme"
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>
        <button
          className="icon-btn menu-btn"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}
