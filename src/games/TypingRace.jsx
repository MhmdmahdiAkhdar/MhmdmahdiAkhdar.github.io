import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import useLeaderboard from '../hooks/useLeaderboard.js';
import { Leaderboard, ResultPanel, verdict } from './GameParts.jsx';
import { devScores } from '../data.jsx';

const LINE = 44; // px, must match .words line-height
const POOL = ('const let function return async await react node props state hook render query fetch array ' +
  'object string class import export public static void commit merge branch push pull server client route ' +
  'laravel php artisan blade eloquent java csharp dotnet express mysql mongodb python linux git ' +
  'token cache index style flex grid type interface null true false promise event loop debug build test api ' +
  'json schema sql controller model view migration').split(' ');

const randomWords = n => Array.from({ length: n }, () => POOL[(Math.random() * POOL.length) | 0]);

export default function TypingRace() {
  const board = useLeaderboard('typerace-v2', devScores.typing);
  const [dur, setDur] = useState(30);
  const [words, setWords] = useState(() => randomWords(80));
  const [marks, setMarks] = useState([]);      // 'ok' | 'bad' per finished word
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState('idle');  // idle | run | done
  const [hud, setHud] = useState({ time: 30, wpm: 0, acc: 100, left: 1 });
  const [shift, setShift] = useState(0);
  const [result, setResult] = useState(null);
  const [highlight, setHighlight] = useState(null);
  const stats = useRef({ correct: 0, keys: 0, errors: 0, t0: 0 });
  const curRef = useRef(null);
  const inputRef = useRef(null);

  const accuracy = () => {
    const s = stats.current;
    return s.keys ? Math.round(((s.keys - s.errors) / s.keys) * 100) : 100;
  };

  function reset(newDur = dur) {
    stats.current = { correct: 0, keys: 0, errors: 0, t0: 0 };
    setDur(newDur);
    setWords(randomWords(80)); setMarks([]); setIdx(0); setInput('');
    setHud({ time: newDur, wpm: 0, acc: 100, left: 1 });
    setResult(null); setHighlight(null); setShift(0);
    setPhase('idle');
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  // keep the current word on the second line by scrolling the word list up
  useLayoutEffect(() => {
    const el = curRef.current;
    if (!el) return;
    setShift(Math.max(0, el.offsetTop - el.parentElement.firstChild.offsetTop - LINE));
    if (idx > words.length - 30) setWords(w => [...w, ...randomWords(60)]);
  }, [idx, words.length]);

  // countdown while racing
  useEffect(() => {
    if (phase !== 'run') return;
    const tick = setInterval(() => {
      const s = stats.current;
      const elapsed = (performance.now() - s.t0) / 1000;
      const left = Math.max(0, dur - elapsed);
      setHud({ time: Math.ceil(left), wpm: Math.round(s.correct / 5 / (Math.max(elapsed, 1) / 60)), acc: accuracy(), left: left / dur });
      if (left <= 0) {
        clearInterval(tick);
        const wpm = Math.round(s.correct / 5 / (dur / 60)), acc = accuracy();
        setHud({ time: 0, wpm, acc, left: 0 });
        setResult({ wpm, badge: `${dur}s race · ${acc}% accuracy`, text: verdict(wpm - devScores.typing.score, 'WPM') });
        setPhase('done');
      }
    }, 100);
    return () => clearInterval(tick);
  }, [phase, dur]);

  function onChange(e) {
    if (phase === 'done') return;
    const s = stats.current;
    if (phase === 'idle') { s.t0 = performance.now(); setPhase('run'); }
    const v = e.target.value;
    const inserted = (e.nativeEvent.inputType || '').startsWith('insert');
    if (inserted) s.keys += Math.max(1, (e.nativeEvent.data || '').length);

    if (v.includes(' ')) {                      // space submits the word(s) — handles paste/autocomplete too
      const parts = v.split(' ');
      const rest = parts.pop();
      const done = {};
      let i = idx;
      for (const typed of parts) {
        if (!typed) continue;
        const ok = typed === words[i];
        if (ok) s.correct += words[i].length + 1; else s.errors++;
        done[i++] = ok ? 'ok' : 'bad';
      }
      setMarks(m => { const n = [...m]; Object.assign(n, done); return n; });
      setIdx(i);
      setInput(rest);
      return;
    }
    if (!words[idx].startsWith(v) && inserted) s.errors++;
    setInput(v);
  }

  const onTrack = words[idx]?.startsWith(input);

  return (
    <div className="game">
      <div className={`arena ${phase === 'done' ? 'done' : ''}`}>
        <div className="arena-top">
          <div className="modes">
            {[15, 30, 60].map(t => (
              <button key={t} className={`chip ${dur === t ? 'on' : ''}`} onClick={() => reset(t)}>{t}s</button>
            ))}
          </div>
          <div className="hud">
            <div><b>{hud.time}</b><span>sec</span></div>
            <div><b>{hud.wpm}</b><span>wpm</span></div>
            <div><b>{hud.acc}%</b><span>acc</span></div>
          </div>
        </div>
        <div className="timebar"><i style={{ transform: `scaleX(${hud.left})` }} /></div>

        {phase !== 'done' && <>
          <div className="words">
            <div className="words-inner" style={{ transform: `translateY(-${shift}px)` }}>
              {words.map((w, i) => {
                const cls = i === idx ? (onTrack ? 'cur' : 'err') : marks[i] || '';
                return <span key={i} ref={i === idx ? curRef : null} className={`w ${cls}`}>{w}</span>;
              })}
            </div>
          </div>
          <input
            ref={inputRef}
            className="type-in"
            value={input}
            onChange={onChange}
            onKeyDown={e => e.key === 'Escape' && reset()}
            placeholder="Start typing to begin… (Esc to restart)"
            autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false}
            aria-label="Type the words shown"
          />
        </>}

        {phase === 'done' && result && (
          <ResultPanel
            badge={result.badge}
            title={`${result.wpm} WPM`}
            text={result.text}
            onSave={name => setHighlight(board.add(name, result.wpm))}
            onAgain={() => reset()}
          />
        )}
      </div>
      <Leaderboard rows={board.rows} unit="wpm" highlight={highlight} />
    </div>
  );
}
