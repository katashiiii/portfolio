import { useState } from "react";
import { config } from "../config.js";
import Reveal from "./Reveal.jsx";

const SAMPLES = [
  "Scientists confirm the moon is made entirely of cheese, government hides the truth.",
  "The central bank held interest rates steady on Wednesday, citing stable inflation data.",
];

// Expects POST { text } -> { label: "fake" | "real", confidence: 0..1 }
export default function FakeNewsDemo() {
  const [text, setText] = useState("");
  const [state, setState] = useState({ status: "idle" });

  if (!config.fakeNewsApi) return null;

  const run = async (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setState({ status: "loading" });
    try {
      const res = await fetch(config.fakeNewsApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: t }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!["fake", "real"].includes(data.label)) throw new Error("bad response");
      setState({ status: "done", label: data.label, confidence: Number(data.confidence) || 0 });
    } catch {
      setState({ status: "error" });
    }
  };

  const pct = Math.round((state.confidence || 0) * 100);

  return (
    <Reveal className="demo" as="div">
      <h3 id="demo" className="demo-title">
        <span className="accent">&gt;</span> Live demo: fake news detector
      </h3>
      <p className="muted">
        Paste a headline or short article. A BERT-based model returns a label and a confidence score. This is a
        portfolio demo, not a fact-checking service.
      </p>
      <form onSubmit={run}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          maxLength={2000}
          placeholder="Paste text to analyse…"
          aria-label="Text to analyse"
        />
        <div className="cta">
          <button className="btn primary" type="submit" disabled={state.status === "loading" || !text.trim()}>
            {state.status === "loading" ? "Analysing…" : "Analyse"}
          </button>
          {SAMPLES.map((s, i) => (
            <button key={i} type="button" className="btn ghost" onClick={() => setText(s)}>
              Sample {i + 1}
            </button>
          ))}
        </div>
      </form>
      <div aria-live="polite">
        {state.status === "done" && (
          <div className={`verdict ${state.label}`}>
            <strong>{state.label === "fake" ? "Likely misleading" : "Likely reliable"}</strong>
            <div className="bar">
              <span style={{ width: `${pct}%` }} />
            </div>
            <span className="mono">{pct}% confidence</span>
          </div>
        )}
        {state.status === "error" && (
          <p className="muted">The demo server isn't responding right now (it may be waking up). Try again in a moment.</p>
        )}
      </div>
    </Reveal>
  );
}
