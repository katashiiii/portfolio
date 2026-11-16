import { useEffect, useState } from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Architecture from "./components/Architecture.jsx";
import Skills from "./components/Skills.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Notes from "./components/Notes.jsx";
import Contact from "./components/Contact.jsx";
import AskCv from "./components/AskCv.jsx";

function getInitialTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* ignore */
  }
  return "dark";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="progress" style={{ width: `${progress}%` }} />
      <div className="bg-grid" aria-hidden="true" />
      <Nav theme={theme} onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Architecture />
        <Skills />
        <Testimonials />
        <Notes />
        <Contact />
      </main>
      <AskCv />
    </>
  );
}
