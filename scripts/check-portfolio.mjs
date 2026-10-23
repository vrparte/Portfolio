import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const root = new URL('../docs/', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');
const data = JSON.parse(readFileSync(new URL('content.json', root), 'utf8'));
assert(!/tsenta|sponsor|Build yours free/i.test(html), 'Third-party branding found');
assert.equal((html.match(/<h1\b/g)||[]).length, 1, 'Expected one primary heading');
assert.equal(data.projects.length, 3);
assert.equal(data.experience.length, 2);
assert.equal(data.education.length, 2);
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
for (const [,href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (href.startsWith('#')) assert(ids.has(href.slice(1)), `Missing anchor ${href}`);
  else if (!/^(https?:|mailto:)/.test(href)) assert(existsSync(new URL(href, root)), `Missing asset ${href}`);
}
for (const project of data.projects) {
  if(project.url) assert(project.url.startsWith('https://github.com/vrparte/'), 'Unexpected project destination');
}
assert.equal(readFileSync(new URL('CNAME',root),'utf8').trim(), 'varadparte.com');
assert(html.includes('https://varadparte.com/assets/social.png'));
console.log('Portfolio checks passed: content, branding, anchors, local assets, project links, and custom domain.');
