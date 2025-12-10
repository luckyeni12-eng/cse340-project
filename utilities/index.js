// utilities/index.js
function formatCurrency(amount) {
  if (typeof amount !== 'number') amount = Number(amount) || 0;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function formatNumber(num) {
  if (typeof num !== 'number') num = Number(num) || 0;
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * buildVehicleDetailHTML(vehicle)
 * Returns an HTML string for the vehicle detail view.
 * Expects vehicle to have:
 *  - inv_image_full (string URL)
 *  - inv_image_thumb (string URL)
 *  - inv_image_gallery (JSON string or null) where each item could be { thumb: "...", full: "..." } OR array of strings
 */
function buildVehicleDetailHTML(vehicle) {
  const fullImg = vehicle.inv_image_full || '/images/no-image.png';
  // Build gallery: if inv_image_gallery is JSON, attempt to parse. Accept array of strings or objects.
  let thumbs = [];
  try {
    if (vehicle.inv_image_gallery) {
      const parsed = typeof vehicle.inv_image_gallery === 'string'
        ? JSON.parse(vehicle.inv_image_gallery)
        : vehicle.inv_image_gallery;
      // Normalize to array of objects with {thumb, full}
      if (Array.isArray(parsed)) {
        thumbs = parsed.map(item => {
          if (typeof item === 'string') {
            // assume string is path to full image and create thumb variant if needed
            return { thumb: item, full: item };
          } else if (item && typeof item === 'object') {
            return {
              thumb: item.thumb || item.full || fullImg,
              full: item.full || item.thumb || fullImg
            };
          }
          return null;
        }).filter(Boolean);
      }
    }
  } catch (err) {
    // parsing failed; ignore and proceed with empty gallery
    thumbs = [];
  }

  // If no thumbs found, at least provide the main image as one thumb
  if (thumbs.length === 0) {
    thumbs.push({ thumb: vehicle.inv_image_thumb || fullImg, full: fullImg });
  }

  const thumbHtml = thumbs.map((t, i) => {
    // Escape attributes lightly (we're building server-side HTML string)
    const thumbSrc = t.thumb;
    const fullSrc = t.full;
    return `<button class="thumb-btn" data-full="${fullSrc}" aria-label="Show image ${i + 1}" type="button">
              <img src="${thumbSrc}" alt="${vehicle.inv_make} ${vehicle.inv_model} thumbnail ${i + 1}" loading="lazy">
            </button>`;
  }).join('');

  return `
    <div class="vehicle-detail">
      <aside class="gallery">
        <div class="main-image">
          <img id="mainImage" src="${fullImg}" alt="${vehicle.inv_make} ${vehicle.inv_model}" loading="lazy">
        </div>
        <div class="thumbs" id="thumbContainer">
          ${thumbHtml}
        </div>
      </aside>

      <section class="vehicle-info">
        <h1>${vehicle.inv_year || ''} ${vehicle.inv_make || ''} ${vehicle.inv_model || ''}</h1>
        <p class="price"><strong>Price:</strong> ${formatCurrency(vehicle.inv_price || 0)}</p>
        <p><strong>Mileage:</strong> ${formatNumber(vehicle.inv_miles || 0)} miles</p>
        <p class="desc"><strong>Description:</strong> ${vehicle.inv_description || 'No description available.'}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color || 'Unknown'}</p>
        <p><strong>Classification:</strong> ${vehicle.inv_classification || 'N/A'}</p>
      </section>
    </div>

    <script>
      // small client-side script to swap main image when thumbnail clicked
      (function () {
        try {
          const container = document.getElementById('thumbContainer');
          const mainImage = document.getElementById('mainImage');
          if (!container || !mainImage) return;
          container.addEventListener('click', function (ev) {
            const btn = ev.target.closest('.thumb-btn');
            if (!btn) return;
            const full = btn.getAttribute('data-full');
            if (full) mainImage.src = full;
          });
        } catch (e) {
          // fail silently
          console.error(e);
        }
      })();
    </script>
  `;
}

module.exports = {
  buildVehicleDetailHTML,
  formatCurrency,
  formatNumber
};