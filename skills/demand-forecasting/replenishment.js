// Economic Order Quantity (EOQ) replenishment optimization
function calculateEOQ(annualDemand, orderingCost, holdingCostPerUnit) {
    if (holdingCostPerUnit <= 0) return 0;
    // Classic Wilson EOQ Formula: Sqrt( (2 * D * S) / H )
    const quantity = Math.sqrt((2 * annualDemand * orderingCost) / holdingCostPerUnit);
    return Math.round(quantity);
}
module.exports = { calculateEOQ };