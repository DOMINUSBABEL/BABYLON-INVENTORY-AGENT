// Generate a structured markdown-based request for quotes (RFQ)
function generateRFQ(supplierName, itemsList) {
    const date = new Date().toLocaleDateString('es-CO');
    let rfq = `# SOLICITUD DE COTIZACIÓN (RFQ)\n`;
    rfq += `**Fecha:** ${date}\n`;
    rfq += `**Proveedor:** ${supplierName}\n\n`;
    rfq += `Estimado distribuidor,\nSolicitamos formalmente cotización para los siguientes componentes de hardware:\n\n`;
    rfq += `| Componente | Cantidad Solicitada |\n`;
    rfq += `| --- | --- |\n`;
    itemsList.forEach(item => {
        rfq += `| ${item.name} | ${item.quantity} |\n`;
    });
    rfq += `\nQuedamos atentos a sus comentarios y tiempos de entrega.\nAtentamente,\n**BABYLON-INVENTORY-AGENT**`;
    return rfq;
}
module.exports = { generateRFQ };