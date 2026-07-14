'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight,
  CircleArrowOutUpRight, Mail, Menu, Minus, MoveUpRight, Plus,
  Send, Sparkles, X
} from 'lucide-react';

const defaultWorks = [
  { id: 1, title: 'Soft Power', category: 'Portraits', year: '2024', type: 'Still', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1200&q=85', size: 'large', description: 'An exploration of quiet confidence and the spaces we inhabit.' },
  { id: 2, title: 'Salt / Skin', category: 'Editorial', year: '2024', type: 'Still', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85', size: 'tall', description: 'A sun-drenched study for Onda Journal, shot on the coast.' },
  { id: 3, title: 'After Hours', category: 'Motion', year: '2023', type: 'Film', image: 'https://images.unsplash.com/photo-1540224832905-5f3b6b5c5c1f?auto=format&fit=crop&w=1000&q=85', size: 'wide', description: 'A small film about big feelings after the lights go down.' },
  { id: 4, title: 'Noma Objects', category: 'Still Life', year: '2023', type: 'Still', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85', size: 'square', description: 'Form, material and the poetry of everyday objects.' },
  { id: 5, title: 'Morning Rituals', category: 'Editorial', year: '2024', type: 'Still', image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1000&q=85', size: 'tall', description: 'Slow mornings, natural texture and a little bit of ritual.' },
  { id: 6, title: 'In Bloom', category: 'Portraits', year: '2022', type: 'Still', image: 'https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=1000&q=85', size: 'square', description: 'Portraits made with patience, presence and wild flowers.' }
];

const categories = ['All work', 'Portraits', 'Editorial', 'Still Life', 'Motion'];

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All work');
  const [selectedWork, setSelectedWork] = useState(null);
  const [works, setWorks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('maraWorks')) || defaultWorks; } catch { return defaultWorks; }
  });
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => { localStorage.setItem('maraWorks', JSON.stringify(works)); }, [works]);
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') { setSelectedWork(null); setAdminOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const goTo = (page) => {
    setActivePage(page); setMenuOpen(false);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  const filteredWorks = useMemo(() => selectedCategory === 'All work' ? works : works.filter((work) => work.category === selectedCategory), [works, selectedCategory]);

  return <>
    <header className="site-header">
      <button className="wordmark" onClick={() => goTo('home')} aria-label="Juan home"><span>J</span><em>JUAN</em></button>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        <button className={activePage === 'home' ? 'active' : ''} onClick={() => goTo('home')}>Home</button>
        <button className={activePage === 'work' ? 'active' : ''} onClick={() => goTo('work')}>Selected work</button>
        <button className={activePage === 'about' ? 'active' : ''} onClick={() => goTo('about')}>About</button>
        <button className="nav-cta" onClick={() => goTo('contact')}>Book a project <ArrowUpRight size={13} /></button>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main>
      {activePage === 'home' && <Home goTo={goTo} works={works} openWork={setSelectedWork} />}
      {activePage === 'work' && <WorkPage works={filteredWorks} allWorks={works} category={selectedCategory} setCategory={setSelectedCategory} openWork={setSelectedWork} />}
      {activePage === 'about' && <About goTo={goTo} />}
      {activePage === 'contact' && <Contact />}
    </main>

    <footer className="footer">
      <div className="footer-top"><div><p className="eyebrow">Have a vision?</p><button className="footer-link" onClick={() => goTo('contact')}>Let's make it <i>visible.</i> <ArrowUpRight /></button></div><div className="footer-mark">J<span>© 2024</span></div></div>
      <div className="footer-bottom"><span>Based in Bali · Available worldwide</span><span>Instagram&nbsp; / &nbsp;Vimeo&nbsp; / &nbsp;Mail</span><button onClick={() => setAdminOpen(true)} className="admin-trigger">Studio login <CircleArrowOutUpRight size={13} /></button></div>
    </footer>
    {selectedWork && <WorkModal work={selectedWork} close={() => setSelectedWork(null)} />}
    {adminOpen && <AdminPanel works={works} setWorks={setWorks} close={() => setAdminOpen(false)} />}
  </>;
}

function Home({ goTo, works, openWork }) {
  return <div className="page home-page">
    <section className="hero section-pad">
      <div className="hero-intro"><p className="eyebrow reveal">PHOTOGRAPHER · VISUAL DIRECTOR · 01—24</p><h1 className="hero-title reveal">Stories<br /><i>in light.</i></h1><p className="hero-copy reveal">I make images for people, places and ideas that deserve to be remembered.</p><button className="round-arrow reveal" aria-label="Scroll to selected work" onClick={() => document.getElementById('home-work').scrollIntoView({ behavior: 'smooth' })}><ArrowDownRight /></button></div>
      <div className="hero-image-wrap reveal"><img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1800&q=90" alt="Young male photographer in a sunlit studio" /><div className="image-stamp">SCROLL TO EXPLORE <ArrowDownRight size={13} /></div></div>
      <div className="hero-side-note">01 / <span>Light is the subject.<br />Everything else is a feeling.</span></div>
    </section>
    <section className="manifesto section-pad"><p className="eyebrow">A little about the work</p><p className="manifesto-text">The work lives somewhere between <i>instinct</i> and intention — built on honest connection, a love for natural light and the belief that the best frame is often the one you didn't plan.</p><button className="text-link" onClick={() => goTo('about')}>More about Juan <ArrowRight size={15} /></button></section>
    <section className="home-work section-pad" id="home-work"><div className="section-heading"><div><p className="eyebrow">Selected work / 02</p><h2>A few <i>favourites.</i></h2></div><button className="text-link" onClick={() => goTo('work')}>View all work <ArrowUpRight size={15} /></button></div><div className="home-grid">{works.slice(0, 4).map((work, i) => <WorkCard key={work.id} work={work} index={i} openWork={openWork} />)}</div></section>
    <section className="statement-section"><div className="statement-image"><img src="https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=1400&q=85" alt="Portrait in a warm, textural studio" /></div><div className="statement-content"><Sparkles size={24} strokeWidth={1.2} /><p className="eyebrow">The approach / 03</p><h2>Make room<br />for the <i>real.</i></h2><p>Every project begins with a conversation. From there, we build a visual language that feels like you — considered, alive and entirely your own.</p><button className="button-dark" onClick={() => goTo('contact')}>Start a conversation <ArrowUpRight size={15} /></button></div></section>
    <Packages goTo={goTo} />
  </div>;
}

function WorkPage({ works, allWorks, category, setCategory, openWork }) {
  return <div className="page work-page section-pad"><div className="page-intro"><p className="eyebrow">Archive / Selected work</p><h1>Made with <i>feeling.</i></h1><p>A living collection of portraits, places, objects and moving images. Filter the archive by story.</p></div><div className="filters" role="group" aria-label="Filter work">{categories.map((item) => <button className={category === item ? 'selected' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}<span>{works.length.toString().padStart(2, '0')} / {allWorks.length.toString().padStart(2, '0')}</span></div><div className="archive-grid">{works.map((work, i) => <WorkCard key={work.id} work={work} index={i} openWork={openWork} />)}</div>{works.length === 0 && <p className="empty-state">No stories in this chapter yet.</p>}</div>;
}

function WorkCard({ work, index, openWork }) {
  const isVideo = work.type === 'Film' && work.image.startsWith('data:video');
  return <article className={`work-card ${work.size || 'square'}`} onClick={() => openWork(work)} tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && openWork(work)}><div className="card-image">{isVideo ? <video src={work.image} muted loop autoPlay playsInline aria-label={work.title} /> : <img src={work.image} alt={work.title} loading="lazy" />}<span className="card-number">0{index + 1}</span><span className="card-hover"><MoveUpRight size={20} /></span></div><div className="card-info"><div><h3>{work.title}</h3><p>{work.category}</p></div><span>{work.year}</span></div></article>;
}

function About({ goTo }) {
  return <div className="page about-page"><section className="about-hero section-pad"><div><p className="eyebrow">About / The person behind the frame</p><h1>Hi, I'm <i>Juan.</i></h1><p className="about-lead">A 19-year-old photographer and visual director with four years behind the camera, drawn to the honest, the tactile and the beautifully unfinished.</p></div><div className="about-hero-image"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85" alt="Juan, a young male portrait photographer" /><span>Self portrait<br />Ubud, 2024</span></div></section><section className="about-story section-pad"><div className="story-label"><p className="eyebrow">My point of view</p><span>02—04</span></div><div className="story-copy"><p>There is a quiet kind of magic in paying attention. The sun moving across a wall. The split second before someone smiles. Hands finding their way through a familiar ritual.</p><p>That's where I like to work — in the in-between moments that reveal something true. My process is collaborative, calm and a little bit curious. I want you to feel seen, never performed.</p><button className="text-link" onClick={() => goTo('contact')}>Work together <ArrowRight size={15} /></button></div></section><section className="about-details section-pad"><div><p className="eyebrow">The details</p><h2>Good things<br />take <i>time.</i></h2></div><div className="detail-list"><div><span>01</span><b>Based in</b><p>Bali, Indonesia<br />Available worldwide</p></div><div><span>02</span><b>Experience</b><p>4 years behind the camera<br />19 years young</p></div><div><span>03</span><b>Specialising in</b><p>Portraits · Editorial<br />Brand stories · Film</p></div></div></section></div>;
}

function Packages({ goTo }) {
  const items = [{ no: '01', title: 'The Mini', desc: 'For the quiet, meaningful moments.', price: 'from $850', features: ['60 min session', '1 location', '35 edited images'] }, { no: '02', title: 'The Story', desc: 'A little more room for the full picture.', price: 'from $1,800', features: ['Half day coverage', '2 locations', '90 edited images'] }, { no: '03', title: 'The Chapter', desc: 'For brands with a story to tell.', price: 'from $3,500', features: ['Full day production', 'Creative direction', 'Photo + short film'] }];
  return <section className="packages section-pad"><div className="section-heading"><div><p className="eyebrow">Services / 04</p><h2>Choose your<br /><i>adventure.</i></h2></div><p className="section-blurb">Every project is different. These are a starting point — let's shape something that fits.</p></div><div className="package-list">{items.map((item) => <div className="package" key={item.no}><span className="package-no">{item.no}</span><h3>{item.title}</h3><p>{item.desc}</p><strong>{item.price}</strong><ul>{item.features.map(f => <li key={f}><Check size={14} />{f}</li>)}</ul><button className="package-action" onClick={() => goTo('contact')} aria-label={`Enquire about ${item.title}`}><ArrowUpRight /></button></div>)}</div></section>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  return <div className="page contact-page section-pad"><div className="contact-intro"><p className="eyebrow">Contact / Book a project</p><h1>Let's make<br />something <i>real.</i></h1><p>Tell Juan a little about your vision, your people or the feeling you want to capture. He'll be in touch within 2–3 days.</p><div className="contact-details"><a href="mailto:hello@juanvisuals.studio"><Mail size={15} /> hello@juanvisuals.studio</a><span>Bali · Worldwide</span></div></div><form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}><label>Your name<input required placeholder="What should I call you?" /></label><label>Email address<input type="email" required placeholder="you@email.com" /></label><label>I'm interested in<select defaultValue=""><option value="" disabled>Select a service</option><option>Portraits</option><option>Editorial</option><option>Brand story</option><option>Film / Motion</option></select><ChevronDown size={16} /></label><label>Tell me about it<textarea required placeholder="A few words about your project, dates and budget..."></textarea></label><button className="button-dark submit-button" type="submit">{sent ? <>Message sent <Check size={16} /></> : <>Send enquiry <Send size={15} /></>}</button><p className="form-note">By sending this form, you agree to be contacted about your enquiry.</p></form></div>;
}

function WorkModal({ work, close }) {
  const isVideo = work.type === 'Film' && work.image.startsWith('data:video');
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()}><div className="work-modal" role="dialog" aria-modal="true" aria-label={work.title}><button className="modal-close" onClick={close} aria-label="Close"><X /></button>{isVideo ? <video src={work.image} muted loop autoPlay playsInline aria-label={work.title} /> : <img src={work.image} alt={work.title} />}<div className="modal-copy"><p className="eyebrow">{work.category} · {work.year}</p><h2>{work.title}</h2><p>{work.description}</p><span>{work.type} / Juan Studio</span></div></div></div>;
}

function AdminPanel({ works, setWorks, close }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', category: 'Portraits', year: '2024', image: '', description: '', type: 'Still', size: 'square' });
  const startEdit = (work) => { setEditing(work.id); setForm(work); };
  const reset = () => { setEditing(null); setForm({ title: '', category: 'Portraits', year: '2024', image: '', description: '', type: 'Still', size: 'square' }); };
  const handleFile = (event) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => setForm({ ...form, image: reader.result, type: file.type.startsWith('video/') ? 'Film' : 'Still' }); reader.readAsDataURL(file); };
  const save = (e) => { e.preventDefault(); if (!form.title || !form.image) return; if (editing) setWorks(works.map(w => w.id === editing ? { ...form, id: editing } : w)); else setWorks([...works, { ...form, id: Date.now() }]); reset(); };
  return <div className="modal-backdrop admin-backdrop"><aside className="admin-panel" role="dialog" aria-modal="true" aria-label="Studio content manager"><div className="admin-head"><div><p className="eyebrow">Private studio / CMS</p><h2>Manage work</h2></div><button className="modal-close" onClick={close} aria-label="Close"><X /></button></div><div className="admin-body"><form className="admin-form" onSubmit={save}><div className="admin-form-title"><span>{editing ? 'Edit story' : 'Add new story'}</span>{editing && <button type="button" onClick={reset}>Cancel</button>}</div><input required placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /><input placeholder="Image URL (Unsplash or CDN)" value={form.image.startsWith('data:') ? '' : form.image} onChange={e => setForm({ ...form, image: e.target.value })} /><label className="file-upload">Upload image or video<input type="file" accept="image/*,video/*" onChange={handleFile} /></label><div className="input-row"><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>{categories.slice(1).map(c => <option key={c}>{c}</option>)}</select><input placeholder="Year" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} /></div><textarea placeholder="Short description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}></textarea><select value={form.size} onChange={e => setForm({ ...form, size: e.target.value })}><option value="square">Square layout</option><option value="tall">Tall layout</option><option value="wide">Wide layout</option><option value="large">Large layout</option></select><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option value="Still">Still image</option><option value="Film">Motion / video</option></select><button className="button-dark" type="submit">{editing ? 'Save changes' : 'Add to archive'} <Plus size={16} /></button></form><div className="admin-archive"><div className="admin-form-title"><span>{works.length} stories in archive</span><span className="saved-label"><Check size={13} /> saved locally</span></div>{works.map(work => <div className="admin-item" key={work.id}>{work.type === 'Film' && work.image.startsWith('data:video') ? <video src={work.image} muted /> : <img src={work.image} alt="" />}<div><b>{work.title}</b><span>{work.category} · {work.year}</span></div><button onClick={() => startEdit(work)} aria-label={`Edit ${work.title}`}>Edit</button><button onClick={() => setWorks(works.filter(w => w.id !== work.id))} aria-label={`Delete ${work.title}`}><Minus size={15} /></button></div>)}</div></div><p className="admin-footnote">This demo panel stores your archive in this browser. Connect the form to a backend or storage service when ready to publish.</p></aside></div>;
}
