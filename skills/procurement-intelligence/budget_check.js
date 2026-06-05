function checkBudgetAvailability(itemPrice, remainingBudget) {
    return itemPrice <= remainingBudget;
}
module.exports = { checkBudgetAvailability };