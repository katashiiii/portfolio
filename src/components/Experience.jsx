import { useState } from "react";
import { experience } from "../data.js";
import Reveal from "./Reveal.jsx";

export default function Experience() {
  const [active, setActive] = useState(experience[0].id);
  const job = experience.find((e) => e.id === active);

  return (
    <section id="experience" className="section">
      <Reveal>
        <h2 className="section-title">
          <span className="accent">02.</span> Experience
        </h2>
      </Reveal>
      <Reveal className="exp">
        <div className="exp-tabs" role="tablist" aria-label="Companies">
          {experience.map((e) => (
            <button
              key={e.id}
              role="tab"
              aria-selected={active === e.id}
              className={active === e.id ? "active" : ""}
              onClick={() => setActive(e.id)}
            >
              {e.company.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>
        <div className="exp-panel" role="tabpanel" key={job.id}>
          <h3>
            {job.role} <span className="accent">@ {job.company}</span>
          </h3>
          <p className="muted mono">
            {job.period} · {job.place}
          </p>
          <ul className="ticks">
            {job.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
