const { generateBarcode } = require('../skills/barcode-generation/barcode_generator');
test('generates expected sku string', () => {
    expect(generateBarcode('GPU-4090')).toBe('BARCODE-MOCK-FOR-GPU-4090');
});