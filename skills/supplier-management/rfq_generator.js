// Automated RFQ compiler
function generateRFQ(item, qty, supplier) {
    return `Solicitud de cotización para ${qty} unidades de ${item}. Proveedor: ${supplier}.`;
}
module.exports = { generateRFQ };