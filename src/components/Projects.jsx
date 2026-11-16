import { useState } from "react";
import { projects } from "../data.js";
import { config } from "../config.js";
import Reveal from "./Reveal.jsx";
import FakeNewsDemo from "./FakeNewsDemo.jsx";

function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);
  const panelId = `proj-${project.id}`;
  const { github, demo } = project.links || {};
  const hasLiveDemo = project.id === "fakenews" && !!config.fakeNewsApi;

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
      <div className="card-actions">
        <button
          className="link-btn"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
        >
          {open ? "− Hide details" : "+ Case study"}
        </button>
        {github && (
          <a className="link-btn" href={github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        )}
        {demo && (
          <a className="link-btn" href={demo} target="_blank" rel="noreferrer">
            Live demo ↗
          </a>
        )}
        {hasLiveDemo && (
          <a className="link-btn" href="#demo">
            Try it ↓
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal>
        <h2 className="section-title">Projects</h2>
      </Reveal>
      <div className="cards">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 100}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
      <FakeNewsDemo />
    </section>
  );
}
