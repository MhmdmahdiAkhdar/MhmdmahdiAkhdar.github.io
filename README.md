# Mohammad Mahdi Akhdar — Portfolio

React + Vite portfolio with two mini-games (Bug Squash and Typing Race).

## Run it

```bash
npm install
npm run dev
```

## Edit content

Everything you'd want to change — bio, stats, tech stack, projects, timeline,
and your own game high scores — is in `src/data.jsx`.
Replace `public/resume.pdf` with your latest CV.

## Build for hosting

```bash
npm run build
```

Upload the `dist/` folder to GitHub Pages, Netlify or Vercel.

## Structure

- `src/components/` — page sections (Hero, About, Stack, Projects, Timeline, Play, Contact)
- `src/games/` — Bug Squash, Typing Race and shared leaderboard/result UI
- `src/hooks/` — scroll reveal, active nav tab, leaderboard storage
- `legacy/index.html` — the original single-file version
