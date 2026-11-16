import { useState } from "react";
import { skills } from "../data.js";
import Reveal from "./Reveal.jsx";

export default function Skills() {
  const categories = ["All", ...Object.keys(skills)];
  const [active, setActive] = useState("All");

  const entries = Object.entries(skills).filter(([cat]) => active === "All" || cat === active);

  return (
    <section id="skills" className="section">
      <Reveal>
        <h2 className="section-title">
          <span className="accent">04.</span> Skills
        </h2>
      </Reveal>
      <Reveal className="chips" >
        {categories.map((c) => (
          <button
            key={c}
            className={`chip ${active === c ? "active" : ""}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </Reveal>
      <div className="skill-groups">
        {entries.map(([cat, items]) => (
          <div key={cat} className="skill-group">
            <h3 className="mono">{cat}</h3>
            <div className="tags">
              {items.map((s) => (
                <span key={s} className="tag big">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
