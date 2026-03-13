/* ══════════════════════════════════════════════════
   DAXIES FINE DINING — JAVASCRIPT
   script.js
══════════════════════════════════════════════════ */

/* ─── CUSTOM CURSOR ─── */
const cursor = document.getElementById('cursor');
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (hasFinePointer && cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  const interactiveElements = 'a, button, .menu-tab, .dish-card, input, select, textarea, label';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactiveElements)) {
      cursor.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactiveElements)) {
      cursor.classList.remove('cursor-hover');
    }
  });
}

document.querySelectorAll('a[href="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => e.preventDefault());
});

/* ─── NAVBAR SCROLL EFFECT ─── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

/* ─── PAGE NAVIGATION ─── */
function showPage(page) {
  // Hide all pages and deactivate all nav links
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  // Show requested page and mark its nav link active
  document.getElementById('page-' + page).classList.add('active');
  const navLink = document.getElementById('nav-' + page);
  if (navLink) navLink.classList.add('active');

  document.querySelectorAll('.page-list-link').forEach(link => {
    link.classList.toggle('active', link.textContent.trim().toLowerCase() === page);
  });

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });

  return false; // prevent default anchor behaviour
}

/* ─── MENU TABS ─── */
function switchMenu(section, btn) {
  // Hide all menu sections and deactivate all tab buttons
  document.querySelectorAll('.menu-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.menu-tab').forEach(b => b.classList.remove('active'));

  // Show selected section and activate its button
  document.getElementById('menu-' + section).classList.add('active');
  btn.classList.add('active');
}

/* ─── RESERVATION FORM SUBMIT ─── */
function submitReservation() {
  // Basic validation — make sure name and email are filled
  const inputs = document.querySelectorAll('#reservationForm .form-input');
  let valid = true;

  inputs.forEach(input => {
    if (input.type !== 'date' && input.value.trim() === '') {
      input.style.borderColor = 'rgba(200,50,50,.8)';
      valid = false;
    } else {
      input.style.borderColor = '';
    }
  });

  if (!valid) return; // stop if empty required fields

  // Hide form and show success message
  document.getElementById('reservationForm').style.display = 'none';
  document.getElementById('successMsg').classList.add('show');
}
