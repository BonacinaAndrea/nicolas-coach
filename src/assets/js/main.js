function toggleNav() {
  const nav = document.getElementById('navLinks');
  const btn = document.querySelector('.nav-hamburger');
  nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', nav.classList.contains('open'));
}
document.querySelectorAll('.anim').forEach(el => {
  new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 }).observe(el);
});

(function(){
  const track = document.getElementById('htTrack');
  if (!track) return;
  const section = track.closest('section');
  const cards = Array.from(track.querySelectorAll('.ht-card'));
  const total = cards.length;
  let cur = 0;
  let autoTimer = null;
  let isHover = false;

  function getStep() {
    const card = cards[0];
    if (!card) return 0;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
    return card.offsetWidth + gap;
  }

  function goTo(n) {
    cur = ((n % total) + total) % total;
    track.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    track.style.transform = `translateX(-${cur * getStep()}px)`;
  }

  window.htNext = function() { goTo(cur + 1); resetAuto(); };
  window.htPrev = function() { goTo(cur - 1); resetAuto(); };

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => { if (!isHover) goTo(cur + 1); }, 2800);
  }
  function resetAuto() { clearInterval(autoTimer); startAuto(); }

  if (section) {
    section.addEventListener('mouseenter', () => { isHover = true; });
    section.addEventListener('mouseleave', () => { isHover = false; });
  }

  // Touch swipe
  let tx = 0;
  track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const d = tx - e.changedTouches[0].clientX;
    if (Math.abs(d) > 40) { if (d > 0) htNext(); else htPrev(); }
  }, { passive: true });

  window.addEventListener('resize', () => { goTo(cur); });

  goTo(0);
  startAuto();
})();
function toggleTesti(id) {
  const row = document.getElementById(id);
  const isOpen = row.classList.contains('open');
  document.querySelectorAll('.testi-row.open').forEach(r => {
    r.classList.remove('open');
    r.querySelector('[aria-expanded]').setAttribute('aria-expanded','false');
    r.querySelector('.testi-row-toggle').textContent = '+';
  });
  if (!isOpen) {
    row.classList.add('open');
    row.querySelector('[aria-expanded]').setAttribute('aria-expanded','true');
    row.querySelector('.testi-row-toggle').textContent = '−';
  }
}
