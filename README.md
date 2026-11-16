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

## Where to edit

| What | Where |
| --- | --- |
| Bio, stats, experience, projects, skills, testimonials, notes, architecture | `src/data.js` |
| Feature switches (photo, form, chat, demo, analytics) | `src/config.js` |
| Colors and fonts | CSS variables at the top of `src/index.css` |
| Page title / share preview | `index.html` |

## Features and how to switch them on

- **CV download:** already on. Replace `public/Rithik_Marian_CV.pdf` when your CV changes (keep the name).
- **Profile photo:** put `photo.jpg` in `public/` and set `photo: "photo.jpg"` in `src/config.js`.
- **Project links:** fill `links: { github, demo }` for each project in `src/data.js`. Empty ones are hidden.
- **Share preview:** in `index.html`, replace `YOUR-USERNAME` and `YOUR-REPO` (4 places, plus the comment above them). Also set `siteUrl` in `src/config.js`.
  `public/og-image.png` is the preview image (1200x630).
- **Ask my CV chat:** works out of the box by searching your CV data in the browser. For Claude-powered answers,
  deploy `serverless/ask-cv-worker.js` (instructions at the top of that file) and set `askCvEndpoint`.
  If you change your CV text in `data.js`, update the `CV` string in the worker too.
- **Fake-news live demo:** host your model with `fake-news-api/` (you must plug in your trained model in
  `load_model()` and `predict()`), then set `fakeNewsApi` in `src/config.js`. The demo section is hidden until then.
- **Contact form:** create a free form at formspree.io and set `formspreeId`. Until then it opens the visitor's email app.
- **Testimonials and Notes:** add entries to `testimonials` / `notes` in `src/data.js`. Sections stay hidden while empty.
- **Analytics:** create a free GoatCounter site and set `goatcounter` to your code.
- **404 page:** `public/404.html`. For a project site (`user.github.io/repo/`), set `REPO` inside it.

## Terminal easter eggs

`help`, `about`, `skills`, `projects`, `work`, `stats`, `resume`, `contact`, `whoami`, `ls`, `pwd`, `date`,
`sudo hire-me`. Up/Down arrows browse history, Tab completes.

## Deploy (GitHub Pages)

1. Push this folder to a GitHub repo on branch `main`.
2. Settings -> Pages -> Source: **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes on every push.

If the page is blank, see "If the page is blank" below.

### If the page is blank
- View page source. If it shows `/src/main.jsx`, Pages is serving the repo instead of the build: set Source to **GitHub Actions**.
- If `.js`/`.css` files 404 in the browser Network tab, set `base: "/portfolio/"` in `vite.config.js` (or `"/"` for a user site).

## Structure

```
index.html            meta tags, share preview, JSON-LD
public/               CV pdf, favicon, og-image, 404.html
serverless/           Cloudflare Worker for Claude-powered "Ask my CV"
fake-news-api/        Flask template for the live model demo
src/
  config.js           feature switches
  data.js             all content
  askLocal.js         in-browser CV answerer
  components/         Nav, Hero, Terminal, About, Experience, Projects, FakeNewsDemo,
                      Architecture, Skills, Testimonials, Notes, Contact, AskCv, Reveal
```
