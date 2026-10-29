import { useState } from 'react';

// A per-browser leaderboard stored in localStorage as [{ id, name, score }].
// The developer's own score is always shown as the target to beat.
export default function useLeaderboard(key, dev) {
  const [entries, setEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
  });

  const rows = [{ ...dev, id: 'dev', dev: true }, ...entries]
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  function add(name, score) {
    const entry = { id: Date.now(), name, score };
    const next = [...entries, entry].sort((a, b) => b.score - a.score).slice(0, 20);
    setEntries(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* storage blocked */ }
    return entry.id;
  }

  return { rows, add };
}
