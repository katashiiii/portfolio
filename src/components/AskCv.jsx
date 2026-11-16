import { useEffect, useRef, useState } from "react";
import { config } from "../config.js";
import { answerLocal, SUGGESTIONS } from "../askLocal.js";

async function askRemote(question) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(config.askCvEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.answer) throw new Error("empty");
    return data.answer;
  } finally {
    clearTimeout(timer);
  }
}

export default function AskCv() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [value, setValue] = useState("");
  const [msgs, setMsgs] = useState([
    { from: "bot", text: "Hi, I'm an assistant that answers questions about Rithik's CV. Try one of the suggestions below." },
  ]);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = async (text) => {
    const q = text.trim();
    if (!q || busy) return;
    setMsgs((m) => [...m, { from: "me", text: q }]);
    setValue("");
    setBusy(true);
    let answer;
    if (config.askCvEndpoint) {
      try {
        answer = await askRemote(q);
      } catch {
        answer = answerLocal(q);
      }
    } else {
      answer = answerLocal(q);
    }
    setMsgs((m) => [...m, { from: "bot", text: answer }]);
    setBusy(false);
  };

  return (
    <>
      {open && (
        <div className="chat" role="dialog" aria-label="Ask my CV">
          <div className="chat-head">
            <strong>Ask my CV</strong>
            <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>
          <div className="chat-body" ref={bodyRef} aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`bubble ${m.from}`}>
                {m.text}
              </div>
            ))}
            {busy && <div className="bubble bot muted">Thinking…</div>}
          </div>
          <div className="chat-sugg">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => ask(s)} disabled={busy}>
                {s}
              </button>
            ))}
          </div>
          <form
            className="chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              ask(value);
            }}
          >
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ask about skills, projects, availability…"
              aria-label="Your question"
              maxLength={300}
            />
            <button className="btn primary" type="submit" disabled={busy || !value.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
      <button className="chat-fab" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? "Close" : "💬 Ask my CV"}
      </button>
    </>
  );
}
