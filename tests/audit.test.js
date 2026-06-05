const { logAudit } = require('../skills/audit-logs/auditor');
test('audit formatting verification', () => {
    expect(logAudit('BUY', 'Geist')).toBe('[AUDIT] Action: BUY by User: Geist');
});