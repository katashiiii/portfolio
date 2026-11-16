import { useEffect, useState } from "react";
import { architecture } from "../data.js";
import Reveal from "./Reveal.jsx";

export default function Architecture() {
  const layers = architecture.layers;
  const [selected, setSelected] = useState(layers[2].nodes[0].id);
  const [trace, setTrace] = useState(-1); // index of the layer currently lit, -1 = off

  useEffect(() => {
    if (trace < 0) return;
    if (trace >= layers.length) {
      const t = setTimeout(() => setTrace(-1), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setTrace((i) => i + 1), 750);
    return () => clearTimeout(t);
  }, [trace, layers.length]);

  const node = layers.flatMap((l) => l.nodes).find((n) => n.id === selected);

  return (
    <section id="architecture" className="section">
      <Reveal>
        <h2 className="section-title">Platform architecture</h2>
        <p className="muted arch-intro">
          A simplified view of the multi-tenant logistics platform. Click any block, or trace a request through the
          layers.
        </p>
      </Reveal>
      <Reveal className="arch">
        <div className="arch-diagram">
          {layers.map((layer, li) => (
            <div key={layer.id}>
              <div className={`arch-layer ${trace === li ? "lit" : ""}`}>
                <span className="arch-label mono">{layer.label}</span>
                <div className="arch-nodes">
                  {layer.nodes.map((n) => (
                    <button
                      key={n.id}
                      className={`arch-node ${selected === n.id ? "sel" : ""}`}
                      onClick={() => setSelected(n.id)}
                      aria-pressed={selected === n.id}
                    >
                      {n.name}
                    </button>
                  ))}
                </div>
              </div>
              {li < layers.length - 1 && (
                <div className={`arch-arrow ${trace === li ? "lit" : ""}`} aria-hidden="true">
                  ↓
                </div>
              )}
            </div>
          ))}
          <button className="btn" onClick={() => setTrace(0)} disabled={trace >= 0}>
            {trace >= 0 ? "Tracing…" : "▶ Trace a request"}
          </button>
        </div>
        <aside className="arch-info" aria-live="polite">
          <h3>{node.name}</h3>
          <p>{node.info}</p>
          <p className="muted arch-note">Illustrative diagram based on my role. No client or proprietary detail.</p>
        </aside>
      </Reveal>
    </section>
  );
}
