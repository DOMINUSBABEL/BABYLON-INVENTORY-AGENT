function getBufferMultiplier(leadTimeDays) {
    return leadTimeDays > 10 ? 1.5 : 1.2;
}
module.exports = { getBufferMultiplier };