import { testimonials } from "../data.js";
import Reveal from "./Reveal.jsx";

export default function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section id="testimonials" className="section">
      <Reveal>
        <h2 className="section-title">What people say</h2>
      </Reveal>
      <div className="quotes">
        {testimonials.map((t, i) => (
          <Reveal key={t.name + i} delay={i * 90}>
            <figure className="quote">
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <span className="muted"> · {t.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
