import { useState } from "react";
import { profile } from "../data.js";
import { config } from "../config.js";
import Reveal from "./Reveal.jsx";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", _gotcha: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form._gotcha) return; // honeypot: bots fill this hidden field

    if (!config.formspreeId) {
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${config.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      setForm({ name: "", email: "", message: "", _gotcha: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-row">
        <label>
          Name
          <input value={form.name} onChange={set("name")} required autoComplete="name" maxLength={100} />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={set("email")} required autoComplete="email" maxLength={150} />
        </label>
      </div>
      <label>
        Message
        <textarea value={form.message} onChange={set("message")} required rows={5} maxLength={3000} />
      </label>
      <input
        className="hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form._gotcha}
        onChange={set("_gotcha")}
        name="_gotcha"
      />
      <button className="btn primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p className="form-status muted" aria-live="polite">
        {status === "sent" && "Thanks! Your message was sent. I'll get back to you soon."}
        {status === "error" && `Couldn't send that. Please email me at ${profile.email} instead.`}
      </p>
    </form>
  );
}

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
        <p className="eyebrow center">What's next</p>
        <h2 className="contact-title">Let's build something.</h2>
        <p className="lead center">
          I'm available immediately and open to relocating. If you have a role in full-stack or AI engineering, I'd
          love to hear about it.
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
        <ContactForm />
      </Reveal>
      <footer className="footer mono">
        © {new Date().getFullYear()} {profile.name} · Built with React + Vite
      </footer>
    </section>
  );
}
