import { useEffect, useState } from 'react';
import Reveal, { SectionHead } from './Reveal.jsx';
import { stack } from '../data.jsx';

export default function Stack() {
  const [pressed, setPressed] = useState(null);

  // pressing a real key "presses" the matching keycap
  useEffect(() => {
    let t;
    const onKey = e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (!stack.some(s => s.key === k)) return;
      setPressed(k);
      clearTimeout(t);
      t = setTimeout(() => setPressed(null), 220);
    };
    addEventListener('keydown', onKey);
    return () => { removeEventListener('keydown', onKey); clearTimeout(t); };
  }, []);

  return (
    <section id="stack">
      <SectionHead num="02" title="Tech stack" />
      <Reveal className="kb">
        {stack.map(s => (
          <div key={s.key} className={`key ${s.wide ? 'wide' : ''} ${pressed === s.key ? 'pressed' : ''}`}>
            <small>{s.key.toUpperCase()}</small><span>{s.label}</span>
          </div>
        ))}
      </Reveal>
      <Reveal as="p" className="kb-hint">
        Try typing <kbd>P</kbd> <kbd>H</kbd> <kbd>P</kbd> on your keyboard.
      </Reveal>
    </section>
  );
}
