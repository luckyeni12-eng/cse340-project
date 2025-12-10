// public/js/gallery.js
document.addEventListener('DOMContentLoaded', () => {
  const thumbContainer = document.getElementById('thumbContainer');
  if (!thumbContainer) return;

  thumbContainer.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.thumb-btn');
    if (!btn) return;
    const full = btn.dataset.full;
    if (!full) return;
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
      mainImage.src = full;
      // update focus/ARIA
      document.querySelectorAll('.thumb-btn img').forEach(img => img.style.borderColor = '');
      const img = btn.querySelector('img');
      if (img) img.style.borderColor = '';
    }
  });

  // optional: keyboard support - Enter/Space to activate thumbnail buttons
  thumbContainer.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      const btn = ev.target.closest('.thumb-btn');
      if (btn) {
        btn.click();
        ev.preventDefault();
      }
    }
  });
});