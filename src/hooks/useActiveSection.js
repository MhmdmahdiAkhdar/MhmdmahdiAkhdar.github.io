import { useEffect, useState } from 'react';

// Returns the id of the section currently in the middle of the screen.
export default function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [ids]);

  return active;
}
