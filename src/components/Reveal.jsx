import useInView from '../hooks/useInView.js';

// Fades + slides its content in the first time it scrolls into view.
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export function SectionHead({ num, title }) {
  return (
    <Reveal className="sec-head">
      <span className="num">{num}.</span>
      <h2>{title}</h2>
      <span className="rule" />
    </Reveal>
  );
}
