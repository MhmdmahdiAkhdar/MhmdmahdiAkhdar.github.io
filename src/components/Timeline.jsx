import Reveal, { SectionHead } from './Reveal.jsx';
import { timeline } from '../data.jsx';

export default function Timeline() {
  return (
    <section id="experience">
      <SectionHead num="04" title="Education & journey" />
      <div className="timeline">
        {timeline.map(t => (
          <Reveal key={t.title} className="job">
            <span className="when">{t.when}</span>
            <h3>{t.title} <em>· {t.where}</em></h3>
            <p>{t.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
