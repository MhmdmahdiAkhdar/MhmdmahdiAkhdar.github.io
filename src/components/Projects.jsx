import { useState } from 'react';
import Reveal, { SectionHead } from './Reveal.jsx';
import { thumbs } from './Thumbs.jsx';
import { projects } from '../data.jsx';

const FILTERS = [['all', 'All'], ['web', 'Web'], ['desktop', 'Desktop']];

function ProjectCard({ p }) {
  const Thumb = thumbs[p.thumb];
  return (
    <Reveal as="a" href={p.url} target="_blank" rel="noopener" className={`card ${p.featured ? 'featured' : ''}`}>
      <div className="thumb">
        {p.image
          ? <img src={p.image} alt={`Screenshot of ${p.title}`} loading="lazy" />
          : Thumb && <Thumb />}
      </div>
      <div className="body">
        {p.featured && <span className="badge">★ Featured project</span>}
        <h3>{p.title} <span className="arrow">↗</span></h3>
        <p>{p.description}</p>
        <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const shown = projects.filter(p => filter === 'all' || p.category === filter);

  return (
    <section id="work">
      <SectionHead num="03" title="Selected work" />
      <Reveal className="filters">
        {FILTERS.map(([id, label]) => (
          <button key={id} className={`chip ${filter === id ? 'on' : ''}`} onClick={() => setFilter(id)}>{label}</button>
        ))}
      </Reveal>
      <div className="grid">
        {shown.map(p => <ProjectCard key={p.title} p={p} />)}
      </div>
    </section>
  );
}
