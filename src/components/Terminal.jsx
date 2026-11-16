import { useEffect, useRef, useState } from "react";
import { profile, projects, skills, experience, stats } from "../data.js";
import { config, asset } from "../config.js";

const t = (text) => ({ text });
const link = (text, href) => ({ text, href });

function downloadCv() {
  const a = document.createElement("a");
  a.href = asset(config.cvFile);
  a.download = config.cvFile;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const COMMANDS = {
  help: () =>
    [
      "Available commands:",
      "  about      who I am",
      "  skills     tech stack",
      "  projects   things I've built",
      "  work       experience",
      "  stats      numbers that matter",
      "  resume     download my CV",
      "  contact    get in touch",
      "  whoami, ls, pwd, date, clear",
      "  ...and a couple of hidden ones",
    ].map(t),
  about: () => [profile.title, profile.tagline, `${profile.location} | ${profile.status}`].map(t),
  whoami: () => [t("rithik: full-stack developer, AI/ML engineer, coffee-powered.")],
  pwd: () => [t("/home/rithik/portfolio")],
  ls: () => [t("about/  experience/  projects/  skills/  contact/  Rithik_Marian_CV.pdf")],
  date: () => [t(new Date().toString())],
  skills: () => Object.entries(skills).map(([k, v]) => t(`${k.padEnd(15)} ${v.slice(0, 4).join(", ")}...`)),
  projects: () => projects.map((p) => t(`• ${p.title} [${p.metric}]`)),
  work: () => experience.map((e) => t(`• ${e.role} @ ${e.company} (${e.period})`)),
  stats: () => stats.map((s) => t(`${(s.value).toLocaleString("en-US")}${s.suffix}  ${s.label}`)),
  contact: () => [
    link(`email    ${profile.email}`, `mailto:${profile.email}`),
    link(`github   ${profile.github}`, profile.github),
    link(`linkedin ${profile.linkedin}`, profile.linkedin),
    t(`phone    ${profile.phone}`),
  ],
  resume: () => {
    downloadCv();
    return [t("Downloading Rithik_Marian_CV.pdf ...")];
  },
  "sudo hire-me": () => [
    t("[sudo] password for recruiter: ********"),
    t("Permission granted. Excellent decision."),
    t("Initiating offer letter ... done. 🚀"),
    link(`Next step: email ${profile.email}`, `mailto:${profile.email}?subject=Opportunity`),
  ],
};
COMMANDS.hire = COMMANDS["sudo hire-me"];
COMMANDS.cv = COMMANDS.resume;

const QUICK = ["about", "skills", "projects", "work", "resume", "sudo hire-me"];

export default function Terminal() {
  const [lines, setLines] = useState([t("Welcome. Type a command or tap one below. Try 'help'.")]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const bodyRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase().replace(/\s+/g, " ");
    if (!cmd) return;
    setHistory((h) => [cmd, ...h].slice(0, 30));
    setHIdx(-1);
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    let out;
    if (COMMANDS[cmd]) out = COMMANDS[cmd]();
    else if (cmd.startsWith("echo ")) out = [t(raw.trim().slice(5))];
    else if (cmd.startsWith("sudo ")) out = [t("Nice try. Only 'sudo hire-me' works here.")];
    else if (cmd.startsWith("rm ")) out = [t("Permission denied. This portfolio is read-only.")];
    else out = [t(`command not found: ${cmd}. Try 'help'.`)];
    setLines((prev) => [...prev, { text: cmd, input: true }, ...out]);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hIdx + 1, history.length - 1);
      if (next >= 0 && history[next]) {
        setHIdx(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = hIdx - 1;
      setHIdx(next);
      setValue(next >= 0 ? history[next] : "");
    } else if (e.key === "Tab") {
      const v = value.trim().toLowerCase();
      if (!v) return;
      const match = Object.keys(COMMANDS).filter((c) => c.startsWith(v));
      if (match.length === 1) {
        e.preventDefault();
        setValue(match[0]);
      }
    }
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
          <div key={i} className={l.input ? "t-in" : "t-out"}>
            {l.input && <span className="accent">$ </span>}
            {l.href ? (
              <a href={l.href} target={l.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
                {l.text}
              </a>
            ) : (
              l.text
            )}
          </div>
        ))}
      </div>
      <form className="terminal-form" onSubmit={onSubmit}>
        <span className="accent">$</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
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
