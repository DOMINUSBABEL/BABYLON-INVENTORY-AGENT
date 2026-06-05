const { checkBudgetAvailability } = require('../skills/procurement-intelligence/budget_check');
test('budget checks block expensive items', () => {
    expect(checkBudgetAvailability(100, 50)).toBe(false);
});