function logAudit(action, user) {
    return `[AUDIT] Action: ${action} by User: ${user}`;
}
module.exports = { logAudit };