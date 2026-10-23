import { readFileSync, writeFileSync } from 'node:fs';
const c = JSON.parse(readFileSync(new URL('../docs/content.json', import.meta.url), 'utf8'));
const esc = (s) => String(s).replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const tags = (items) => `<ul class="tags" aria-label="Technologies">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
const arrow = '<span aria-hidden="true">↗</span>';
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#fafafa">
  <title>Varad Parte | Applied AI Engineer</title>
  <meta name="description" content="Varad Parte is an Applied AI Engineer in Cincinnati building LLM applications, RAG systems, document intelligence, and agentic workflows with Python and Azure.">
  <link rel="canonical" href="https://varadparte.com/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Varad Parte | Applied AI Engineer">
  <meta property="og:description" content="LLM engineering, document intelligence, and agentic automation. Explore my experience and projects.">
  <meta property="og:url" content="https://varadparte.com/">
  <meta property="og:image" content="https://varadparte.com/assets/social.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="assets/manrope-latin.woff" as="font" type="font/woff" crossorigin>
  <link rel="preload" href="assets/public-sans-latin.woff" as="font" type="font/woff" crossorigin>
  <link rel="stylesheet" href="assets/tokens.css">
  <link rel="stylesheet" href="assets/style.css">
  <script src="assets/app.js" defer></script>
  <script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'Person',name:c.name,url:'https://varadparte.com/',jobTitle:c.role,sameAs:[c.github,c.linkedin],knowsAbout:['LLM engineering','RAG','Document intelligence','Agentic automation'],alumniOf:{'@type':'CollegeOrUniversity',name:'University of Cincinnati'}})}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header wrap">
    <a class="identity" href="#top" aria-label="Varad Parte, back to top"><span class="monogram" aria-hidden="true">vp<span>.</span></span><span>Varad Parte</span></a>
    <a class="contact-link" href="mailto:${esc(c.email)}">Get in touch ${arrow}</a>
  </header>
  <main id="main" class="wrap">
    <section class="hero" id="top" aria-labelledby="name">
      <div class="hero-meta"><span class="role-label">${esc(c.role)}</span><span class="location"><span aria-hidden="true">⌖</span> ${esc(c.location)}</span></div>
      <h1 id="name">${esc(c.name)}<span class="name-period">.</span></h1>
      <p class="intro">${esc(c.intro)}</p>
      <p class="about">${esc(c.about)}</p>
      <div class="hero-links">
        <a href="${esc(c.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ${arrow}</a>
        <a href="${esc(c.github)}" target="_blank" rel="noopener noreferrer">GitHub ${arrow}</a>
        <a href="mailto:${esc(c.email)}">Email ${arrow}</a>
        <button class="text-button print-button" type="button" hidden>Print résumé <span aria-hidden="true">↓</span></button>
      </div>
    </section>
    <div class="document-layout">
      <aside class="section-index" aria-label="On this page">
        <nav aria-label="Portfolio sections"><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#education">Education</a></nav>
        <p class="index-note">Grounded AI.<br>Practical engineering.</p>
      </aside>
      <div class="document-content">
        <section id="experience" class="document-section" aria-labelledby="experience-heading">
          <h2 id="experience-heading">Experience</h2>
          ${c.experience.map((x,i)=>`<article class="job">
            <div class="entry-meta"><span>${esc(x.start)} – ${esc(x.end)}</span>${i===0?'<span class="current-label">Current role</span>':''}</div>
            <h3>${esc(x.role)}</h3><p class="company">${esc(x.company)}</p>
            <ul class="bullet-list">${x.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul>${tags(x.tags)}
          </article>`).join('')}
        </section>
        <section id="projects" class="document-section" aria-labelledby="projects-heading">
          <div class="section-heading"><h2 id="projects-heading">Selected projects</h2><span class="section-caption">From signals to systems</span></div>
          ${c.projects.map((x,i)=>`<article class="project">
            <p class="project-type">${esc(x.type)}</p>
            <h3>${esc(x.shortTitle)}</h3>
            <p class="project-summary">${esc(x.summary)}</p>
            ${tags(x.tags)}
            <details class="project-detail">
              <summary><span>Explore the build</span><span class="expand-icon" aria-hidden="true">+</span></summary>
              <div class="detail-body"><h4>${esc(x.title)}</h4><ol class="system-flow" aria-label="System workflow">${x.flow.map(f=>`<li>${esc(f)}</li>`).join('')}</ol><ul class="bullet-list">${x.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul></div>
            </details>
            ${x.url?`<a class="project-source" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer" aria-label="View ${esc(x.shortTitle)} on GitHub">View source ${arrow}</a>`:''}
          </article>`).join('')}
        </section>
        <section id="skills" class="document-section" aria-labelledby="skills-heading">
          <h2 id="skills-heading">Tools & capabilities</h2>
          <dl class="skill-list">${c.skills.map(x=>`<div><dt>${esc(x.category)}</dt><dd>${x.items.map(esc).join('<span class="skill-separator" aria-hidden="true"> / </span>')}</dd></div>`).join('')}</dl>
        </section>
        <section id="education" class="document-section" aria-labelledby="education-heading">
          <h2 id="education-heading">Education</h2>
          ${c.education.map(x=>`<article class="education-entry"><p class="entry-meta">${esc(x.start)} – ${esc(x.end)}</p><h3>${esc(x.degree)}</h3><p class="company">${esc(x.school)}</p>${x.detail?`<p class="education-detail">${esc(x.detail)}</p>`:''}</article>`).join('')}
        </section>
      </div>
    </div>
    <section class="contact-section" id="contact" aria-labelledby="contact-heading"><div><h2 id="contact-heading">Let’s build something useful.</h2><p>Connect about applied AI, engineering, or a project you have in mind.</p></div><a class="email-link" href="mailto:${esc(c.email)}">${esc(c.email)} ${arrow}</a></section>
  </main>
  <footer class="wrap site-footer"><p>© ${new Date().getUTCFullYear()} Varad Parte</p><div><a href="${esc(c.github)}" target="_blank" rel="noopener noreferrer">GitHub ${arrow}</a><a href="#top">Back to top ↑</a></div></footer>
</body>
</html>`;
writeFileSync(new URL('../docs/index.html', import.meta.url), html);
console.log('Rendered docs/index.html from docs/content.json');
