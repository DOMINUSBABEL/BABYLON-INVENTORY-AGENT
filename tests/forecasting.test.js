const { calculateReorderQuantity } = require('../skills/demand-forecasting/replenishment');
test('reorder trigger works on low stock', () => {
    expect(calculateReorderQuantity(1, 2, 5)).toBe(4);
});