import { useEffect, useState } from 'react';
import useActiveSection from '../hooks/useActiveSection.js';
import { profile } from '../data.jsx';

const TABS = [
  ['about', 'about.md'],
  ['stack', 'stack.json'],
  ['work', 'work.tsx'],
  ['experience', 'log.txt'],
  ['play', 'play.exe'],
  ['contact', 'contact.sh'],
];
const IDS = TABS.map(([id]) => id);

function initialTheme() {
  try { return localStorage.getItem('theme') || 'dark'; } catch { return 'dark'; }
}

export default function Nav() {
  const active = useActiveSection(IDS);
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch { /* storage blocked */ }
  }, [theme]);

  return (
    <nav>
      <div className="wrap">
        <a href="#top" className="logo">~/{profile.handle}<span>_</span></a>
        <div className="tabs">
          {TABS.map(([id, label], i) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
              <i>{String(i + 1).padStart(2, '0')}</i>{label}
            </a>
          ))}
        </div>
        <button
          className="theme-btn"
          aria-label="Toggle light and dark theme"
          onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
