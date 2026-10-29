import { useState } from 'react';
import Reveal, { SectionHead } from './Reveal.jsx';
import BugSquash from '../games/BugSquash.jsx';
import TypingRace from '../games/TypingRace.jsx';

const GAMES = [
  { id: 'squash', label: '🐛 Bug Squash', Component: BugSquash },
  { id: 'type', label: '⌨️ Typing Race', Component: TypingRace },
];

export default function Play() {
  const [active, setActive] = useState('squash');
  const { Component } = GAMES.find(g => g.id === active);

  return (
    <section id="play">
      <SectionHead num="05" title="Beat my score" />
      <Reveal as="p" className="play-lead">
        Two quick games that work on <b>phone and PC</b>. Pick one and try to beat the developer's score.
      </Reveal>
      <Reveal className="game-tabs">
        {GAMES.map(g => (
          <button key={g.id} className={`chip ${active === g.id ? 'on' : ''}`} onClick={() => setActive(g.id)}>{g.label}</button>
        ))}
      </Reveal>
      {/* key forces a fresh game when switching tabs */}
      <Reveal><Component key={active} /></Reveal>
    </section>
  );
}
