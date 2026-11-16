import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { config } from "./config.js";
import "./index.css";

// Optional privacy-friendly analytics (GoatCounter: no cookies, no personal data).
if (config.goatcounter) {
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.dataset.goatcounter = `https://${config.goatcounter}.goatcounter.com/count`;
  document.head.appendChild(s);
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
