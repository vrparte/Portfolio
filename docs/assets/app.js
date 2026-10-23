// The portfolio remains fully readable with JavaScript disabled.
const printButton = document.querySelector('.print-button');
if (printButton) {
  printButton.hidden = false;
  printButton.addEventListener('click', () => window.print());
}
// Preserve each visitor's disclosure choices while showing complete project details in print.
let disclosureState = [];
window.addEventListener('beforeprint', () => {
  disclosureState = [...document.querySelectorAll('details')].map(el => [el, el.open]);
  disclosureState.forEach(([el]) => { el.open = true; });
});
window.addEventListener('afterprint', () => {
  disclosureState.forEach(([el, open]) => { el.open = open; });
});
const sectionLinks = [...document.querySelectorAll('.section-index a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (!visible.length) return;
    sectionLinks.forEach(link => {
      if (link.hash === `#${visible[0].target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-5% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('.document-section').forEach(section => observer.observe(section));
}
