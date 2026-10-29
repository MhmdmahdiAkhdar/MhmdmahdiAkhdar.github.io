import { useEffect, useState } from 'react';
import Reveal from './Reveal.jsx';
import { profile, terminal } from '../data.jsx';

function Prompt() {
  return <><span className="p">➜</span> <span className="k">~</span> </>;
}

const lines = terminal.flatMap(([cmd, out]) => [{ cmd }, { out }]);

// Prints the terminal lines one by one, like someone typing.
function Terminal() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown(n => n + 1), lines[shown].cmd ? 600 : 200);
    return () => clearTimeout(t);
  }, [shown]);

  const last = lines.length - 1;
  return (
    <Reveal className="term" aria-label="Terminal introduction">
      <div className="term-bar"><b /><b /><b /><span>zsh — whoami</span></div>
      <div className="term-body">
        {lines.slice(0, shown).map((l, i) => (
          <div key={i}>
            {l.cmd ? <><Prompt />{l.cmd}</>
              : <span className="m" style={i === last ? { color: 'var(--accent)' } : undefined}>{l.out}</span>}
          </div>
        ))}
        {shown >= lines.length && <div><Prompt /><span className="caret" /></div>}
      </div>
    </Reveal>
  );
}

export default function Hero() {
  return (
    <header className="hero">
      <Reveal>
        <div className="status"><span className="dot" />{profile.status}</div>
        <h1>Hi, I'm {profile.firstName}.<br /><span className="grad">{profile.tagline}</span></h1>
        <p className="lead">{profile.lead}</p>
        <div className="cta">
          <a href="#work" className="btn primary">View my work →</a>
          <a href="#contact" className="btn">Get in touch</a>
          <a href={profile.resume} className="btn" target="_blank" rel="noopener">Résumé ↓</a>
        </div>
      </Reveal>
      <Terminal />
    </header>
  );
}
