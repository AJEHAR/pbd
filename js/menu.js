// ═══════════════════════════════════════════════════════════════
// MENU.JS — Hamburger & Drawer
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  const hamburger    = document.getElementById('hamburger');
  const drawer       = document.getElementById('drawer');
  const overlay      = document.getElementById('drawerOverlay');
  const drawerClose  = document.getElementById('drawerClose');

  function openMenu() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    hamburger.classList.add('active');
  }

  function closeMenu() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('active');
  }

  if (hamburger)   hamburger.addEventListener('click', openMenu);
  if (drawerClose) drawerClose.addEventListener('click', closeMenu);
  if (overlay)     overlay.addEventListener('click', closeMenu);

  // Tutup drawer bila resize ke desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });

  // Set logo sekolah
  const logos = document.querySelectorAll('.school-logo');
  logos.forEach(el => {
    el.src = CONFIG.SCHOOL_LOGO;
    el.alt = CONFIG.SCHOOL_NAME_BM;
  });
});
