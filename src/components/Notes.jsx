import { useState } from "react";
import { notes } from "../data.js";
import Reveal from "./Reveal.jsx";

export default function Notes() {
  const [openId, setOpenId] = useState(null);
  if (!notes.length) return null;
  return (
    <section id="notes" className="section">
      <Reveal>
        <h2 className="section-title">Notes</h2>
      </Reveal>
      <div className="notes">
        {notes.map((n, i) => {
          const open = openId === n.id;
          return (
            <Reveal key={n.id} delay={i * 80}>
              <article className={`note ${open ? "open" : ""}`}>
                <button
                  className="note-head"
                  onClick={() => setOpenId(open ? null : n.id)}
                  aria-expanded={open}
                  aria-controls={`note-${n.id}`}
                >
                  <span>
                    <strong>{n.title}</strong>
                    <span className="muted"> · {n.date}</span>
                    <span className="note-sum muted">{n.summary}</span>
                  </span>
                  <span className="accent">{open ? "−" : "+"}</span>
                </button>
                <div id={`note-${n.id}`} className="note-body" hidden={!open}>
                  {n.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
