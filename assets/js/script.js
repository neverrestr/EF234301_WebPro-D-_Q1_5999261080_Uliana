/* ============================================================
   EF234301 Web Programming — Quiz 1
   Personal Website — behavior
   Author: Uliana (5999261080)
   ============================================================ */

'use strict';

/* ------------------------------------------------------------
   1. Highlight the current page in the navigation
   ------------------------------------------------------------ */
function markActiveNavLink() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const links = document.querySelectorAll('.site-header nav a');

  links.forEach((link) => {
    const linkPath = new URL(link.href, window.location.origin)
      .pathname
      .replace(/\/+$/, '') || '/';

    if (linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

/* ------------------------------------------------------------
   2. Mobile menu toggle
   ------------------------------------------------------------ */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');

  if (!toggle || !nav) return;

  const list = nav.querySelector('ul');
  if (!list) return;

  toggle.addEventListener('click', () => {
    const isOpen = list.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  list.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      list.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!list.classList.contains('nav-open')) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    list.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (!list.classList.contains('nav-open')) return;
    list.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  });
}

/* ------------------------------------------------------------
   3. Auto-update footer year
   ------------------------------------------------------------ */
function updateYear() {
  const yearSpans = document.querySelectorAll('[data-year]');
  const year = new Date().getFullYear();
  yearSpans.forEach((span) => {
    span.textContent = String(year);
  });
}

/* ------------------------------------------------------------
   4. Boot
   ------------------------------------------------------------ */
function init() {
  markActiveNavLink();
  initMobileMenu();
  updateYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}