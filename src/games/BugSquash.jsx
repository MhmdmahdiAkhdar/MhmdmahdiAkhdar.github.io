import { useEffect, useRef, useState } from 'react';
import useLeaderboard from '../hooks/useLeaderboard.js';
import { Leaderboard, ResultPanel, verdict } from './GameParts.jsx';
import { devScores } from '../data.jsx';

const DURATION = 30;
const MAX_ON_SCREEN = 6;
const KINDS = {
  bug: { emoji: '🐛', pts: 10 },
  fly: { emoji: '🦟', pts: 25 },
  bomb: { emoji: '💣', pts: -30 },
};

// One bug on the field. It crawls a little while it's alive.
function Bug({ bug }) {
  const [moved, setMoved] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setMoved(true)));
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <button
      type="button"
      data-id={bug.id}
      className={`bug ${bug.state === 'squashed' ? 'squashed' : ''} ${bug.state === 'gone' ? 'gone' : ''}`}
      aria-label={bug.kind === 'bomb' ? 'Bomb — do not tap' : 'Bug'}
      style={{
        left: bug.x, top: bug.y,
        transition: `translate ${bug.life}ms linear`,
        translate: moved ? `${bug.dx}px ${bug.dy}px` : '0 0',
      }}
    >
      {bug.state === 'squashed' ? '💥' : KINDS[bug.kind].emoji}
    </button>
  );
}

export default function BugSquash() {
  const board = useLeaderboard('bugsquash-v1', devScores.squash);
  const fieldRef = useRef(null);
  const game = useRef(null);          // mutable game state that doesn't need re-renders
  const timers = useRef(new Set());   // every pending setTimeout, so we can clean up
  const [phase, setPhase] = useState('idle'); // idle | run | done
  const [bugs, setBugs] = useState([]);
  const [floats, setFloats] = useState([]);
  const [hud, setHud] = useState({ time: DURATION, score: 0, combo: 1, left: 1 });
  const [result, setResult] = useState(null);
  const [highlight, setHighlight] = useState(null);

  const later = (fn, ms) => {
    const t = setTimeout(() => { timers.current.delete(t); fn(); }, ms);
    timers.current.add(t);
  };
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current.clear(); };
  const multiplier = () => Math.min(5, 1 + Math.floor(game.current.streak / 5)); // +1x every 5 hits in a row

  useEffect(() => clearTimers, []);

  // main loop: countdown + spawning, runs only while playing
  useEffect(() => {
    if (phase !== 'run') return;
    const loop = setInterval(() => {
      const g = game.current, now = performance.now();
      const elapsed = (now - g.t0) / 1000;
      const left = Math.max(0, DURATION - elapsed), p = elapsed / DURATION; // p: 0→1, game speeds up
      setHud({ time: Math.ceil(left), score: g.score, combo: multiplier(), left: left / DURATION });
      if (left <= 0) return finish();
      if (now >= g.next && g.alive < MAX_ON_SCREEN) {
        spawn(p);
        g.next = now + 750 - 430 * p;
      }
    }, 50);
    return () => clearInterval(loop);
  }, [phase]);

  function start() {
    clearTimers();
    game.current = { score: 0, streak: 0, hits: 0, misses: 0, escaped: 0, alive: 0, t0: performance.now(), next: 0, id: 0 };
    setBugs([]); setFloats([]); setResult(null); setHighlight(null);
    setHud({ time: DURATION, score: 0, combo: 1, left: 1 });
    setPhase('run');
  }

  function spawn(p) {
    const g = game.current, r = Math.random();
    const kind = p > 0.15 && r < 0.14 ? 'bomb' : r < 0.32 ? 'fly' : 'bug';
    const life = (kind === 'fly' ? 1100 : 1700) - 650 * p;
    const { clientWidth: w, clientHeight: h } = fieldRef.current;
    const bug = {
      id: ++g.id, kind, life, state: 'alive',
      x: 36 + Math.random() * (w - 72), y: 36 + Math.random() * (h - 72),
      dx: (Math.random() - 0.5) * 120, dy: (Math.random() - 0.5) * 120,
    };
    g.alive++;
    setBugs(bs => [...bs, bug]);
    later(() => escape(bug), life);
  }

  function escape(bug) {
    const g = game.current;
    if (!g || g.done || g.dead?.has(bug.id)) return;
    markDead(bug.id);
    if (bug.kind !== 'bomb') { g.escaped++; g.streak = 0; }
    setBugs(bs => bs.map(b => (b.id === bug.id ? { ...b, state: 'gone' } : b)));
    later(() => setBugs(bs => bs.filter(b => b.id !== bug.id)), 200);
  }

  function markDead(id) {
    const g = game.current;
    g.dead = g.dead || new Set();
    g.dead.add(id);
    g.alive--;
  }

  // pointerdown = instant response for both mouse and touch
  function onPointerDown(e) {
    const g = game.current;
    if (phase !== 'run') return;
    const el = e.target.closest('.bug');
    if (!el) { g.misses++; g.streak = 0; return; }   // tapping empty space breaks the combo
    const id = +el.dataset.id;
    if (g.dead?.has(id)) return;
    e.preventDefault();
    const bug = bugs.find(b => b.id === id);
    if (!bug) return;
    markDead(id);

    let pts;
    if (bug.kind === 'bomb') { pts = KINDS.bomb.pts; g.streak = 0; g.misses++; }
    else { g.streak++; g.hits++; pts = KINDS[bug.kind].pts * multiplier(); }
    g.score = Math.max(0, g.score + pts);

    setBugs(bs => bs.map(b => (b.id === id ? { ...b, state: 'squashed' } : b)));
    later(() => setBugs(bs => bs.filter(b => b.id !== id)), 250);
    const f = { id: `f${id}`, x: el.style.left, y: el.style.top, pts };
    setFloats(fs => [...fs, f]);
    later(() => setFloats(fs => fs.filter(x => x.id !== f.id)), 700);
  }

  function finish() {
    const g = game.current;
    g.done = true;
    clearTimers();
    setBugs([]); setFloats([]);
    const taps = g.hits + g.misses;
    const acc = taps ? Math.round((g.hits / taps) * 100) : 0;
    setResult({
      score: g.score,
      badge: `${g.hits} squashed · ${g.escaped} escaped · ${acc}% accuracy`,
      text: verdict(g.score - devScores.squash.score, 'points'),
    });
    setPhase('done');
  }

  return (
    <div className="game">
      <div className={`arena ${phase === 'done' ? 'done' : ''}`}>
        <div className="arena-top">
          <span className="hint">🐛 +10 · 🦟 +25 · avoid 💣 −30</span>
          <div className="hud">
            <div><b>{hud.time}</b><span>sec</span></div>
            <div><b>{hud.score}</b><span>score</span></div>
            <div><b>x{hud.combo}</b><span>combo</span></div>
          </div>
        </div>
        <div className="timebar"><i style={{ transform: `scaleX(${hud.left})` }} /></div>

        {phase !== 'done' && (
          <div className="field" ref={fieldRef} onPointerDown={onPointerDown}>
            {phase === 'idle' && <button className="btn primary" onClick={start}>▶ Start squashing</button>}
            {bugs.map(b => <Bug key={b.id} bug={b} />)}
            {floats.map(f => (
              <span key={f.id} className={`float ${f.pts < 0 ? 'neg' : ''}`} style={{ left: f.x, top: f.y }}>
                {f.pts > 0 ? '+' : ''}{f.pts}
              </span>
            ))}
          </div>
        )}

        {phase === 'done' && result && (
          <ResultPanel
            key={result.badge + result.score}
            badge={result.badge}
            title={`${result.score} pts`}
            text={result.text}
            onSave={name => setHighlight(board.add(name, result.score))}
            onAgain={start}
          />
        )}
      </div>
      <Leaderboard rows={board.rows} unit="pts" highlight={highlight} />
    </div>
  );
}
