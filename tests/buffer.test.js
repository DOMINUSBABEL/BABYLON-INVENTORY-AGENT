const { getBufferMultiplier } = require('../src/safety_buffer');
test('lead time buffer multiplier check', () => {
    expect(getBufferMultiplier(15)).toBe(1.5);
});