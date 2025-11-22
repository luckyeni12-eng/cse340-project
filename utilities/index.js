// utilities/index.js
// Export helper utility functions used by controllers and views.

const Intl = global.Intl || require('intl'); // ensure Intl available if necessary

function formatCurrencyUSD(amount) {
  if (amount === null || amount === undefined) return '';
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0, // assume integer prices; adjust if needed
  });
  return formatter.format(amount);
}

function formatNumberWithCommas(num) {
  if (num === null || num === undefined) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * buildVehicleDetailHTML(vehicle)
 * Build an HTML content string (a block) containing vehicle information.
 * This meets the assignment requirement: a utility that wraps the vehicle info into HTML.
 * The controller will pass this string to the view.
 */
function buildVehicleDetailHTML(vehicle) {
  const price = formatCurrencyUSD(vehicle.inv_price);
  const miles = formatNumberWithCommas(vehicle.inv_miles);
  const year = vehicle.inv_year || '';
  const make = vehicle.inv_make || '';
  const model = vehicle.inv_model || '';
  const description = vehicle.inv_description || '';
  const fullImage = vehicle.inv_image || '/images/no-image-available.png';

  // Use semantic HTML — headings, paragraphs, dl for specs
  return `
    <div class="vehicle-detail-block">
      <h1 class="vehicle-title">${year} ${make} ${model}</h1>

      <div class="vehicle-meta">
        <p class="price">${price}</p>
        <p class="mileage"><strong>Mileage:</strong> ${miles} miles</p>
      </div>

      <dl class="vehicle-specs">
        <dt>Make</dt><dd>${make}</dd>
        <dt>Model</dt><dd>${model}</dd>
        <dt>Year</dt><dd>${year}</dd>
        <dt>Price</dt><dd>${price}</dd>
        <dt>Mileage</dt><dd>${miles} miles</dd>
      </dl>

      <section class="vehicle-description">
        <h2>Description</h2>
        <p>${escapeHtml(description)}</p>
      </section>

      <figure class="vehicle-image-figure">
        <img src="${fullImage}" alt="${year} ${make} ${model} full-size" />
      </figure>
    </div>
  `;
}

// basic HTML escaping for description to avoid injection when injected as HTML snippet
function escapeHtml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = {
  formatCurrencyUSD,
  formatNumberWithCommas,
  buildVehicleDetailHTML,
};
