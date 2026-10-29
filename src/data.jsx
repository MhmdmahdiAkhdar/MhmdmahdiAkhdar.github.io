// ============================================================
//  All portfolio content lives here — edit this file to update the site.
// ============================================================

export const profile = {
  name: 'Mohammad Mahdi Akhdar',
  firstName: 'Mohammad Mahdi',
  handle: 'mahdi',
  status: 'Open to internships · Beirut, Lebanon',
  tagline: 'I build things for the web.',
  lead: 'Computer & Communications Engineering student at Antonine University, building full-stack web apps and desktop tools with C#, Laravel, Java and JavaScript.',
  email: 'mohammadmahdiakhdar@gmail.com',
  github: 'https://github.com/MhmdmahdiAkhdar',
  linkedin: 'https://www.linkedin.com/in/mohammad-mahdi-akhdar',
  resume: 'resume.pdf', // file in /public
};

// Lines typed out in the hero terminal: [command, output]
export const terminal = [
  ['whoami', 'mohammad-mahdi — cce student @ antonine university'],
  ['cat skills.txt', 'c# · php/laravel · java · javascript · react · node'],
  ['ls ./projects', 'nexus/  cinemate/  pos-system/'],
  ['echo $STATUS', 'seeking internship ✓'],
];

export const about = [
  <>I'm a <strong>fourth-year Computer &amp; Communications Engineering student</strong> at Antonine University in Beirut, and I enjoy the whole stack: designing databases, building REST APIs and putting a clean UI on top.</>,
  <>I've built a <strong>Java point-of-sale system</strong> that works with a barcode scanner and receipt printer, a <strong>movie &amp; TV tracker</strong> on Node.js and Express, and <strong>Nexus</strong>, a C# and TypeScript portal for managing fintech products and deployments. Most recently I've been learning <strong>C#, PHP and Laravel</strong>.</>,
  <>I'm looking for an <strong>internship</strong> where I can contribute to real projects, learn from experienced engineers and keep growing as a developer.</>,
];

export const stats = [
  { value: 4, label: 'years of engineering' },
  { value: 2, label: 'languages spoken' },
  { value: 19, label: 'technologies' },
  { value: 2, label: 'certifications' },
];

// key = the keyboard letter that "presses" the keycap; wide = takes two columns
export const stack = [
  { key: 's', label: 'C# / .NET', wide: true },
  { key: 'p', label: 'PHP' },
  { key: 'l', label: 'Laravel', wide: true },
  { key: 'a', label: 'Java' },
  { key: 'f', label: 'JavaFX' },
  { key: 'k', label: 'C++' },
  { key: 'y', label: 'Python' },
  { key: 'j', label: 'JavaScript' },
  { key: 't', label: 'TypeScript' },
  { key: 'r', label: 'React', wide: true },
  { key: 'n', label: 'Node.js', wide: true },
  { key: 'e', label: 'Express.js', wide: true },
  { key: 'h', label: 'HTML' },
  { key: 'c', label: 'CSS' },
  { key: 'w', label: 'Tailwind' },
  { key: 'q', label: 'MySQL' },
  { key: 'm', label: 'MongoDB' },
  { key: 'g', label: 'Git' },
  { key: 'x', label: 'Linux' },
];

// image = real screenshot in /public/shots (optional)
// thumb = fallback illustration when there's no image (see components/Thumbs.jsx)
export const projects = [
  {
    title: 'Nexus',
    featured: true,
    category: 'web',
    thumb: 'dashboard',
    image: 'shots/nexus-dashboard.png',
    url: 'https://github.com/MhmdmahdiAkhdar/Nexus',
    description: 'An internal portal for managing a fintech product catalog, client deployments and environments. It has a C# API backend, a TypeScript frontend and its own database layer.',
    tags: ['C#', 'TypeScript', 'REST API', 'SQL'],
  },
  {
    title: 'Cinemate: Movie & TV Tracker',
    category: 'web',
    thumb: 'movies',
    image: 'shots/cinemate-watchlist.jpg',
    url: 'https://github.com/MhmdmahdiAkhdar/cinematev2',
    description: "A full-stack web app for tracking movies and TV shows, managing watchlists and marking what you've finished. Data comes from the TMDB API, and the Express REST APIs avoid unnecessary calls.",
    tags: ['Node.js', 'Express.js', 'EJS', 'TMDB API'],
  },
  {
    title: 'POS System',
    category: 'desktop',
    thumb: 'receipt',
    url: 'https://github.com/MhmdmahdiAkhdar/POS-',
    description: 'A point-of-sale desktop app with product search, cart handling, user login and automated sales reports. It works with a barcode scanner and receipt printer, and stores inventory and transactions in a relational database.',
    tags: ['Java', 'MySQL', 'OOP'],
  },
];

export const timeline = [
  {
    when: '2026',
    title: 'Leveling up the stack',
    where: 'C#, PHP & Laravel',
    text: 'Learned C#, PHP and Laravel and built Nexus, a C# API with a TypeScript frontend for managing fintech products, client deployments and environments.',
  },
  {
    when: 'Oct 2025 — Dec 2025',
    title: 'Project season',
    where: 'POS System & Cinemate',
    text: 'Built a Java point-of-sale system with a relational database and hardware support, plus a full-stack movie and TV tracker with Express.js REST APIs.',
  },
  {
    when: 'Certifications',
    title: "CS50's Introduction to Programming with Python",
    where: 'Harvard',
    text: <>Also completed <strong>Fundamentals of Deep Learning</strong>.</>,
  },
  {
    when: 'Sep 2023 — Present',
    title: 'Computer & Communications Engineering',
    where: 'Antonine University',
    text: 'Undergraduate engineering student covering programming, data structures, databases, networks and communications systems.',
  },
];

// Your own best scores — the targets visitors try to beat. Update after you play!
export const devScores = {
  squash: { name: 'Mahdi (dev)', score: 540 },
  typing: { name: 'Mahdi (dev)', score: 30 },
};
