// utilities/index.js
const invModel = require("../models/inventory-model")

async function buildClassificationList(classification_id = null) {
  const data = await invModel.getClassifications()
  const rows = data.rows ? data.rows : data

  let list = `<select name="classification_id" id="classificationList" required>`
  list += `<option value="">Choose a Classification</option>`

  rows.forEach((row) => {
    list += `<option value="${row.classification_id}"
      ${classification_id == row.classification_id ? "selected" : ""}>
      ${row.classification_name}
    </option>`
  })

  list += `</select>`
  return list
}

function buildDetailHTML(vehicle) {
  return `
    <section class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}">
      <h1>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h1>
      <p>Classification: ${vehicle.classification_name}</p>
      <p>Mileage: ${vehicle.inv_miles}</p>
      <p>Price: $${vehicle.inv_price}</p>
      <p>${vehicle.inv_description}</p>
    </section>
  `
}

module.exports = {
  buildClassificationList,
  buildDetailHTML
}