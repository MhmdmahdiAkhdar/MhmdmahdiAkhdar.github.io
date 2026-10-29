import { useEffect, useState } from 'react';
import Reveal, { SectionHead } from './Reveal.jsx';
import useInView from '../hooks/useInView.js';
import { about, stats } from '../data.jsx';

// Counts up from 0 to `value` once it scrolls into view.
function Stat({ value, label }) {
  const [ref, inView] = useInView();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    let raf;
    const step = now => {
      const p = Math.min((now - t0) / 1200, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <div className="stat" ref={ref}><b>{n}</b><span>{label}</span></div>;
}

export default function About() {
  return (
    <section id="about">
      <SectionHead num="01" title="About me" />
      <div className="about">
        <Reveal>{about.map((p, i) => <p key={i}>{p}</p>)}</Reveal>
        <Reveal className="stats">{stats.map(s => <Stat key={s.label} {...s} />)}</Reveal>
      </div>
    </section>
  );
}
