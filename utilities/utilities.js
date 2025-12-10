// utilities.js
function safeNumber(val, fallback = 0) {
  if (val === null || val === undefined) return fallback;
  // if it's a string with commas or currency, strip non-numeric except dot and minus
  if (typeof val === 'string') {
    const cleaned = val.replace(/[^0-9.-]+/g, '');
    const num = Number(cleaned);
    return Number.isFinite(num) ? num : fallback;
  }
  return typeof val === 'number' && Number.isFinite(val) ? val : fallback;
}

function buildVehicleDetailHTML(vehicle) {
  // Accept either friendly names or inv_* names
  const make = vehicle.make ?? vehicle.inv_make ?? "Unknown";
  const model = vehicle.model ?? vehicle.inv_model ?? "";
  const year = vehicle.year ?? vehicle.inv_year ?? "N/A";
  const priceRaw = vehicle.price ?? vehicle.inv_price ?? null;
  const mileageRaw = vehicle.mileage ?? vehicle.inv_miles ?? vehicle.inv_mileage ?? null;
  const description = vehicle.description ?? vehicle.inv_description ?? "No description available.";
  const image = vehicle.image ?? vehicle.inv_image ?? "/images/placeholder.jpg"; // set your public placeholder path
  const altText = `${make} ${model}`.trim() || "Vehicle";

  const priceNum = safeNumber(priceRaw, 0);
  const mileageNum = safeNumber(mileageRaw, 0);

  const price = priceNum.toLocaleString(undefined, { maximumFractionDigits: 0 });
  const mileage = mileageNum.toLocaleString();

  return `
    <div class="vehicle-detail-container">
        <div class="vehicle-image">
            <img src="${image}" alt="${escapeHtml(altText)}" />
        </div>
        <div class="vehicle-info">
            <h1>${escapeHtml(make)} ${escapeHtml(model)}</h1>
            <p><strong>Year:</strong> ${escapeHtml(String(year))}</p>
            <p><strong>Price:</strong> $${price}</p>
            <p><strong>Mileage:</strong> ${mileage} miles</p>
            <p><strong>Description:</strong> ${escapeHtml(description)}</p>
        </div>
    </div>`;
}

// very small HTML escaper
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = { buildVehicleDetailHTML };