import { readFileSync, writeFileSync } from 'node:fs';
const c = JSON.parse(readFileSync(new URL('../docs/content.json', import.meta.url), 'utf8'));
const esc = (s) => String(s).replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const arrow = '<span aria-hidden="true">↗</span>';
const referenceBullets = points => `<ul class="reference-bullets">${points.map(p=>`<li><span class="reference-bullet" aria-hidden="true"></span><span>${esc(p)}</span></li>`).join('')}</ul>`;
const referenceTags = items => `<ul class="reference-tags" aria-label="Technologies">${items.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`;
const sectionHeading = (number, title, id) => `<div class="reference-section-heading"><span class="reference-number">${number}</span><h2 id="${id}">${title}</h2></div>`;
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
  <link rel="stylesheet" href="assets/reference-sections.css">
  <script src="assets/app.js" defer></script>
  <script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'Person',name:c.name,url:'https://varadparte.com/',jobTitle:c.role,sameAs:[c.github,c.linkedin],knowsAbout:['LLM engineering','RAG','Document intelligence','Agentic automation'],alumniOf:{'@type':'CollegeOrUniversity',name:'University of Cincinnati'}})}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header wrap">
    <a class="identity" href="#top" aria-label="Varad Parte, back to top"><span class="monogram" aria-hidden="true">vp<span>.</span></span><span>Varad Parte</span></a>
    <a class="contact-link" href="mailto:${esc(c.email)}">Get in touch ${arrow}</a>
  </header>
  <main id="main">
    <div class="wrap">
    <section class="hero" id="top" aria-labelledby="name">
      <div class="hero-meta"><span class="role-label">${esc(c.role)}</span><span class="location"><span aria-hidden="true">⌖</span> ${esc(c.location)}</span></div>
      <h1 id="name">${esc(c.name)}<span class="name-period">.</span></h1>
      <figure class="hero-portrait">
        <img src="assets/varad-parte-headshot-960.webp"
          srcset="assets/varad-parte-headshot-480.webp 480w, assets/varad-parte-headshot-960.webp 960w"
          sizes="(min-width: 1024px) 308px, (min-width: 768px) 220px, 96px"
          width="960" height="960" alt="Professional headshot of Varad Parte"
          fetchpriority="high" decoding="async">
      </figure>
      <p class="intro">${esc(c.intro)}</p>
      <p class="about">${esc(c.about)}</p>
      <div class="hero-links">
        <a href="${esc(c.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ${arrow}</a>
        <a href="${esc(c.github)}" target="_blank" rel="noopener noreferrer">GitHub ${arrow}</a>
        <a href="mailto:${esc(c.email)}">Email ${arrow}</a>
        <button class="text-button print-button" type="button" hidden>Print résumé <span aria-hidden="true">↓</span></button>
      </div>
    </section>
    </div>
    <div class="reference-container reference-content">
      <section id="experience" class="reference-section" aria-labelledby="experience-heading">
        ${sectionHeading('01','Experience','experience-heading')}
        ${c.experience.map(x=>`<article class="reference-row">
          <div class="reference-meta">${esc(x.start)} – ${esc(x.end)}</div>
          <div><h3 class="reference-company">${esc(x.company)}</h3><p class="reference-role">${esc(x.role)}</p>${referenceBullets(x.points)}${referenceTags(x.tags)}</div>
        </article>`).join('')}
      </section>
      <section id="projects" class="reference-section" aria-labelledby="projects-heading">
        ${sectionHeading('02','Projects','projects-heading')}
        <div class="reference-projects">${c.projects.map((x,i)=>`<article class="reference-card">
          <div class="reference-card-top"><span class="reference-number">${String(i+1).padStart(2,'0')}</span></div>
          <h3>${esc(x.title)}</h3>
          ${x.points.length?referenceBullets(x.points):`<p class="reference-description">${esc(x.description)}</p>`}
          ${referenceTags(x.tags)}
        </article>`).join('')}</div>
      </section>
      <section id="skills" class="reference-section" aria-labelledby="skills-heading">
        ${sectionHeading('03','Skills','skills-heading')}
        <dl class="reference-skills">${c.skills.map(x=>`<div class="reference-row"><dt class="reference-meta"><span class="reference-category">${esc(x.category)}</span></dt><dd><ul class="reference-skill-tags">${x.items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul></dd></div>`).join('')}</dl>
      </section>
    </div>
    <div class="wrap education-wrap">
        <section id="education" class="document-section" aria-labelledby="education-heading">
          <h2 id="education-heading">Education</h2>
          ${c.education.map(x=>`<article class="education-entry"><p class="entry-meta">${esc(x.start)} – ${esc(x.end)}</p><h3>${esc(x.degree)}</h3><p class="company">${esc(x.school)}</p>${x.detail?`<p class="education-detail">${esc(x.detail)}</p>`:''}</article>`).join('')}
        </section>
    </div>
    <section class="contact-section wrap" id="contact" aria-labelledby="contact-heading"><div><h2 id="contact-heading">Let’s build something useful.</h2><p>Connect about applied AI, engineering, or a project you have in mind.</p></div><a class="email-link" href="mailto:${esc(c.email)}">${esc(c.email)} ${arrow}</a></section>
  </main>
  <footer class="wrap site-footer"><p>© ${new Date().getUTCFullYear()} Varad Parte</p><div><a href="${esc(c.github)}" target="_blank" rel="noopener noreferrer">GitHub ${arrow}</a><a href="#top">Back to top ↑</a></div></footer>
</body>
</html>`;
writeFileSync(new URL('../docs/index.html', import.meta.url), html);
console.log('Rendered docs/index.html from docs/content.json');
