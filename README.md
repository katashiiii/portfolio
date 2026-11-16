# Rithik Marian: Portfolio

Dark, techy portfolio built with React + Vite.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

Requires Node.js 18+.

## Edit content

Everything (bio, stats, experience, projects, skills, links) lives in `src/data.js`.
Colors and fonts are CSS variables at the top of `src/index.css`.

## Structure

```
index.html
src/
  main.jsx            entry point
  App.jsx             theme toggle, scroll progress, page layout
  data.js             all content
  index.css           all styles
  components/
    Nav.jsx           sticky nav + mobile menu + theme toggle
    Hero.jsx          typewriter headline
    Terminal.jsx      interactive "type a command" widget
    About.jsx         bio + animated counters
    Experience.jsx    tabbed timeline
    Projects.jsx      expandable case-study cards
    Skills.jsx        filterable skill groups
    Contact.jsx       copy-email button + links
    Reveal.jsx        scroll fade-in wrapper
```

## Deploy (free)

**Vercel / Netlify:** push to GitHub, import the repo, framework preset "Vite". Done.

**GitHub Pages:** `npm run build`, then publish the `dist/` folder
(for a project site, set `base: "/<repo-name>/"` in `vite.config.js`).
