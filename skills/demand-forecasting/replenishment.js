// SOTA replenishment engine based on safety margins
function calculateReorderQuantity(stock, minStock, targetStock) {
    if (stock >= minStock) return 0;
    return targetStock - stock;
}
module.exports = { calculateReorderQuantity };