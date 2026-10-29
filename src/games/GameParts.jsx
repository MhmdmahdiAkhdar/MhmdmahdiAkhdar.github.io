import { useState } from 'react';

export function Leaderboard({ rows, unit, highlight }) {
  return (
    <aside className="board">
      <h3>Leaderboard</h3>
      <ol>
        {rows.map(r => (
          <li key={r.id} className={r.dev ? 'dev' : r.id === highlight ? 'new' : ''}>
            <span className="n">{r.name}</span>
            <span className="s">{r.score} {unit}</span>
          </li>
        ))}
      </ol>
      <p className="board-note">Scores are saved in this browser.</p>
    </aside>
  );
}

// End-of-game card: score, verdict, "save to leaderboard" and "play again".
export function ResultPanel({ badge, title, text, onSave, onAgain }) {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim());
    setSaved(true);
  }

  return (
    <div className="result" aria-live="polite">
      <span className="badge">{badge}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="result-actions">
        {!saved && (
          <form className="save" onSubmit={submit}>
            <input value={name} onChange={e => setName(e.target.value)} maxLength={16}
              placeholder="Your name" aria-label="Your name" required />
            <button className="btn primary">Save score</button>
          </form>
        )}
        <button className="btn" onClick={onAgain}>↻ Play again</button>
      </div>
    </div>
  );
}

// "You beat me by…" message shared by both games.
export function verdict(diff, unit) {
  if (diff > 0) return `You beat me by ${diff} ${unit}. Respect. Claim your spot on the board!`;
  if (diff === 0) return 'Exactly tied with me. Rematch?';
  return `${-diff} ${unit} short of my score. Run it back!`;
}
