// In-browser "Ask my CV" answerer. No server, no API key. It only ever answers
// from the data in data.js, and says so when the CV doesn't cover something.
import { profile, experience, projects, skills, education } from "./data.js";

const STOP = new Set(
  "a an the is are was were be been do does did he his him has have had of in on at to for with and or but about what which who whom how why when where can could would should tell me you your it its this that these those any there their they them as by from into over under".split(
    " "
  )
);

const tokens = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .split(/\s+/)
    .map((w) => w.replace(/^\.+|\.+$/g, ""))
    .filter((w) => w.length > 1 && !STOP.has(w));

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const has = (text, term) =>
  new RegExp(`(^|[^a-z0-9])${esc(term)}($|[^a-z0-9])`, "i").test(text);

const ALIASES = {
  postgres: "postgresql",
  node: "node.js",
  nodejs: "node.js",
  react: "react.js",
  reactjs: "react.js",
  js: "javascript",
  ml: "nlp",
  tf: "tensorflow",
  sklearn: "scikit-learn",
  mui: "material-ui",
  llm: "llm applications",
  llms: "llm applications",
  agents: "multi-agent ai",
};

function buildChunks() {
  const out = [];
  const add = (text, tags = "") => out.push({ text, words: new Set(tokens(text)), tags: new Set(tokens(tags)) });

  add(`${profile.name} is a ${profile.title}. ${profile.tagline}`, "about who summary introduce overview");
  add(`${profile.status}. Based in ${profile.location}.`, "location relocate relocation available availability notice join start where live");
  experience.forEach((e) => {
    add(`${e.role} at ${e.company} (${e.period}, ${e.place}).`, "experience work job role company employer career history current");
    e.points.forEach((p) => add(`At ${e.company}: ${p}`, "experience work achievement"));
  });
  projects.forEach((p) => {
    add(`${p.title}: ${p.blurb} Stack: ${p.tags.join(", ")}.`, "project built portfolio");
    p.details.forEach((d) => add(`${p.title}: ${d}`, "project"));
  });
  Object.entries(skills).forEach(([k, v]) => add(`${k}: ${v.join(", ")}.`, `skills tech stack technologies ${k}`));
  add(
    `AI/ML: built a BERT-based fake news detection model (94% accuracy) with a Flask app for real-time prediction; works with LLM applications, multi-agent AI, RAG, NLP, TensorFlow and PySpark; developed AI-enhanced Android apps at Cognito Logix; ${education.degree.includes("AI") ? "studied an AI & ML specialization" : "studied computer science"}; current role: Full-Stack Developer (AI Specialist) at Bleu Iris Technologies.`,
    "ai ml artificial intelligence machine learning llm nlp experience background"
  );
  add(
    `${education.degree}, ${education.school} (${education.period}). Certifications: ${education.certs.join("; ")}.`,
    "education degree college university certification certificate study studied qualification"
  );
  add(
    `Email: ${profile.email} | Phone: ${profile.phone} | GitHub: ${profile.github} | LinkedIn: ${profile.linkedin}`,
    "contact email phone reach hire hiring github linkedin"
  );
  return out;
}

const CHUNKS = buildChunks();

export function answerLocal(question) {
  const q = question.trim();
  const ql = q.toLowerCase();
  if (!q) return "Ask me anything about Rithik's experience, skills or projects.";
  if (/^(hi|hello|hey|yo)\b/.test(ql)) {
    return "Hi! I answer questions about Rithik's CV: experience, projects, skills, availability. What would you like to know?";
  }

  // 1) "Does he know X?" style: look for skills named in the question.
  const wanted = new Set();
  Object.entries(skills).forEach(([cat, list]) =>
    list.forEach((s) => {
      const sl = s.toLowerCase();
      const base = sl.replace(/\.js$/, "");
      if (has(ql, sl) || (base.length > 2 && base !== sl && has(ql, base))) wanted.add(`${s} (${cat})`);
    })
  );
  Object.entries(ALIASES).forEach(([alias, canon]) => {
    if (has(ql, alias)) {
      Object.entries(skills).forEach(([cat, list]) =>
        list.forEach((s) => s.toLowerCase() === canon && wanted.add(`${s} (${cat})`))
      );
    }
  });
  if (wanted.size && /(know|use|used|using|experience|familiar|skill|work with|worked with|proficient|stack|can he|does he|has he)/.test(ql)) {
    return `Yes. His CV lists: ${[...wanted].join("; ")}. Ask about his projects or work history to see where he used it.`;
  }

  // 2) Retrieval over CV chunks.
  const qt = new Set(tokens(ql));
  const scored = CHUNKS.map((c) => {
    let score = 0;
    qt.forEach((w) => {
      if (c.words.has(w)) score += 2;
      if (c.tags.has(w)) score += 3;
    });
    return { c, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length || scored[0].score < 3) {
    return `I can't find that on Rithik's CV. Try asking about his experience, projects, skills, education or availability, or email him at ${profile.email}.`;
  }
  const top = scored.slice(0, 2).map((x) => x.c.text);
  return top.join("\n\n");
}

export const SUGGESTIONS = [
  "What has he built?",
  "Does he know React?",
  "Is he available to join?",
  "What's his AI experience?",
];
