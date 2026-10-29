import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { profile } from '../data.jsx';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); } catch { /* clipboard blocked */ }
  }

  return (
    <section id="contact">
      <Reveal className="contact">
        <span className="badge">06. What's next?</span>
        <h2>Let's build something<br />great together.</h2>
        <p>I'm looking for an internship and I'm happy to talk about projects or collaborations. My inbox is always open, and I'll get back to you quickly.</p>
        <span className="mail" title="Click to copy" onClick={copyEmail}>{profile.email}</span>
        <div className="copied">{copied && '✓ copied to clipboard'}</div>
        <div className="socials">
          <a className="btn" href={profile.github} target="_blank" rel="noopener">GitHub</a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
          <a className="btn primary" href={`mailto:${profile.email}`}>Say hello →</a>
        </div>
      </Reveal>
    </section>
  );
}
