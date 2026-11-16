import { useState } from "react";
import { projects } from "../data.js";
import Reveal from "./Reveal.jsx";

function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);
  const panelId = `proj-${project.id}`;

  return (
    <article className={`card ${open ? "open" : ""}`}>
      <div className="card-head">
        <span className="metric">{project.metric}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="muted">{project.blurb}</p>
      <div className="tags">
        {project.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
      <div id={panelId} className="card-more" hidden={!open}>
        <ul className="ticks">
          {project.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
      <button
        className="link-btn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        {open ? "− Hide details" : "+ Case study"}
      </button>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal>
        <h2 className="section-title">
          <span className="accent">03.</span> Projects
        </h2>
      </Reveal>
      <div className="cards">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 100}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
