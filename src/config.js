// Site settings. Fill these in to switch features on. Anything left empty ("")
// is simply hidden or falls back gracefully, so the site never looks broken.

// Files in /public are served from the site root. This helper keeps paths
// working on both user sites and project sites (https://user.github.io/repo/).
export const asset = (name) => `${import.meta.env.BASE_URL}${name}`;

export const config = {
  // Your live address, used for sharing previews (also edit it in index.html).
  siteUrl: "https://katashiiii.github.io/portfolio/",

  // CV file inside /public
  cvFile: "Rithik_Marian_CV.pdf",

  // Profile photo inside /public, e.g. "photo.jpg". Empty shows your initials.
  photo: "photo.jpg",

  // Contact form via https://formspree.io : paste your form id (the part after /f/).
  // Empty falls back to opening the visitor's email app.
  formspreeId: "",

  // "Ask my CV" chat. Empty uses a built-in answerer that searches your CV data
  // in the browser (no server, no cost). To use Claude instead, deploy
  // serverless/ask-cv-worker.js and paste its URL here.
  askCvEndpoint: "",

  // Fake-news detector demo. Paste the URL of your hosted model API
  // (see fake-news-api/). Empty hides the demo section.
  fakeNewsApi: "",

  // Privacy-friendly analytics: your GoatCounter code, e.g. "rithik"
  // (it becomes https://rithik.goatcounter.com). Empty disables analytics.
  goatcounter: "",
};
