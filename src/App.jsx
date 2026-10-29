import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Stack from './components/Stack.jsx';
import Projects from './components/Projects.jsx';
import Timeline from './components/Timeline.jsx';
import Play from './components/Play.jsx';
import Contact from './components/Contact.jsx';
import { profile } from './data.jsx';

export default function App() {
  return (
    <>
      <Nav />
      <main className="wrap" id="top">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Timeline />
        <Play />
        <Contact />
        <footer>
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Built with React + Vite</span>
        </footer>
      </main>
    </>
  );
}
