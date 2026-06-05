const { calculateEOQ } = require('../skills/demand-forecasting/replenishment');

test('calculates correct EOQ size for hardware elements', () => {
    const eoq = calculateEOQ(1000, 50, 4); // demand=1000, cost=50, holding=4
    expect(eoq).toBe(158); // Sqrt( (2*1000*50)/4 ) = 158.11
});