import { useEffect, useRef, useState } from "react";
import { profile, projects, skills, experience } from "../data.js";

const COMMANDS = {
  help: () => [
    "Available commands:",
    "  about      who I am",
    "  skills     tech stack",
    "  projects   things I've built",
    "  work       experience",
    "  contact    get in touch",
    "  clear      clear the screen",
  ],
  about: () => [profile.title, profile.tagline, `${profile.location} | ${profile.status}`],
  skills: () => Object.entries(skills).map(([k, v]) => `${k.padEnd(15)} ${v.slice(0, 4).join(", ")}...`),
  projects: () => projects.map((p) => `• ${p.title} [${p.metric}]`),
  work: () => experience.map((e) => `• ${e.role} @ ${e.company} (${e.period})`),
  contact: () => [`email  ${profile.email}`, `github ${profile.github}`, `phone  ${profile.phone}`],
};

const QUICK = ["about", "skills", "projects", "work", "contact"];

export default function Terminal() {
  const [lines, setLines] = useState([
    { type: "out", text: "Welcome. Type a command or tap one below. Try 'help'." },
  ]);
  const [value, setValue] = useState("");
  const bodyRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const fn = COMMANDS[cmd];
    const out = fn ? fn() : [`command not found: ${cmd}. Try 'help'.`];
    setLines((prev) => [
      ...prev,
      { type: "in", text: cmd },
      ...out.map((text) => ({ type: "out", text })),
    ]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    run(value);
    setValue("");
  };

  return (
    <div className="terminal" aria-label="Interactive terminal">
      <div className="terminal-bar">
        <span className="dot r" />
        <span className="dot y" />
        <span className="dot g" />
        <span className="terminal-title">rithik@portfolio: ~</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {lines.map((l, i) => (
          <div key={i} className={l.type === "in" ? "t-in" : "t-out"}>
            {l.type === "in" && <span className="accent">$ </span>}
            {l.text}
          </div>
        ))}
      </div>
      <form className="terminal-form" onSubmit={onSubmit}>
        <span className="accent">$</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="type a command..."
          aria-label="Terminal command"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
        />
      </form>
      <div className="terminal-chips">
        {QUICK.map((c) => (
          <button key={c} type="button" onClick={() => run(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
