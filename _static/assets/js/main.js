(function () {
  'use strict';

  /* ---------- Entry disclaimer (BCI Rule 36) ---------- */
  var KEY = 'ajm_disclaimer_agreed';
  var modal = document.getElementById('disclaimer');
  function agreed() { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function openModal() { modal.classList.add('is-open'); document.body.style.overflow = 'hidden'; modal.querySelector('[data-agree]').focus(); }
  function closeModal() { modal.classList.remove('is-open'); document.body.style.overflow = ''; }
  if (!agreed()) openModal();
  modal.querySelector('[data-agree]').addEventListener('click', function () {
    try { localStorage.setItem(KEY, '1'); } catch (e) {}
    closeModal();
  });
  document.querySelectorAll('[data-open-disclaimer]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); openModal(); });
  });

  /* ---------- Mobile menu ---------- */
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  btn.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Active nav link on scroll ---------- */
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (l) { var s = document.querySelector(l.getAttribute('href')); if (s) io.observe(s); });
  }

  /* ---------- Hero practice tabs ---------- */
  var tabs = document.querySelectorAll('.tablist [role="tab"]');
  var num = document.querySelector('[data-tab-num]');
  var title = document.querySelector('[data-tab-title]');
  var text = document.querySelector('[data-tab-text]');
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
      t.setAttribute('aria-selected', 'true');
      num.textContent = t.textContent;
      title.textContent = t.dataset.title;
      text.textContent = t.dataset.text;
    });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); n.click();
    });
  });

  /* ---------- Enquiry form ----------
     TODO: connect to a real endpoint (Formspree, Web3Forms, or your own API).
     Set FORM_ENDPOINT below. Until then the form only validates. */
  var FORM_ENDPOINT = '';
  var form = document.getElementById('enquiry');
  var status = form.querySelector('.form__status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.elements.name.value.trim() || !form.elements.phone.value.trim()) { status.textContent = 'Please enter your name and phone number.'; return; }
    if (!form.elements.consent.checked) { status.textContent = 'Please tick the box to confirm you have read the note.'; return; }
    if (!FORM_ENDPOINT) { status.textContent = 'Form endpoint not set yet (see assets/js/main.js).'; return; }
    status.textContent = 'Sending…';
    fetch(FORM_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
      .then(function (r) { if (!r.ok) throw new Error(); form.reset(); status.textContent = 'Thank you. The chambers will contact you soon.'; })
      .catch(function () { status.textContent = 'Could not send. Please call or email the chambers directly.'; });
  });

  /* ---------- Footer year ---------- */
  var y = document.querySelector('[data-year]'); if (y) y.textContent = new Date().getFullYear();
})();
