import { useEffect, useState } from "react";

const links = [
  ["about", "about"],
  ["experience", "experience"],
  ["projects", "projects"],
  ["skills", "skills"],
  ["contact", "contact"],
];

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
      <nav className={`nav-links ${open ? "open" : ""}`}>
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <button
          className="icon-btn"
          onClick={onToggleTheme}
          aria-label="Toggle light and dark theme"
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
