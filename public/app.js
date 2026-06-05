// App logic for Inventory Agent

document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const menuItems = document.querySelectorAll('.menu-item');
    const tabPanes = document.querySelectorAll('.tab-pane');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            menuItems.forEach(mi => mi.classList.remove('active'));
            tabPanes.forEach(tp => tp.classList.remove('active'));

            item.classList.add('active');
            const tabId = item.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const currentMonthIndex = new Date().getMonth();
    
    // Set buy season indicator
    const buySeasonEl = document.getElementById('buy-season-indicator');
    const currentMonth = months[currentMonthIndex];
    if (currentMonthIndex === 9 || currentMonthIndex === 10) {
        buySeasonEl.textContent = `${currentMonth} (Temporada Óptima)`;
        buySeasonEl.className = 'value success-text';
    } else {
        buySeasonEl.textContent = `${currentMonth} (Baja Conversión)`;
        buySeasonEl.className = 'value warn-text';
    }

    // Load Inventory items
    const invTableBody = document.getElementById('inventory-table-body');

    function formatCurrency(val) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(val);
    }

    function loadInventory() {
        fetch('/api/inventory')
            .then(res => res.json())
            .then(data => {
                invTableBody.innerHTML = '';
                data.forEach(item => {
                    const tr = document.createElement('tr');
                    
                    let statusClass = 'safe';
                    let statusLabel = 'Óptimo';
                    if (item.stock === 0) {
                        statusClass = 'danger';
                        statusLabel = 'Agotado';
                    } else if (item.stock < item.minStock) {
                        statusClass = 'warning';
                        statusLabel = 'Re-orden';
                    }

                    tr.innerHTML = `
                        <td><strong>${item.name}</strong></td>
                        <td>${item.category}</td>
                        <td>
                            <input type="number" class="input-sm item-stock-input" data-id="${item.id}" value="${item.stock}">
                        </td>
                        <td>${item.minStock}</td>
                        <td><span class="stock-badge ${statusClass}">${statusLabel}</span></td>
                        <td class="font-mono">${formatCurrency(item.unitPrice)}</td>
                        <td>${item.supplier}</td>
                        <td>
                            <button class="btn-success btn-update-stock" style="padding: 6px 12px; font-size: 0.8rem;" data-id="${item.id}">Guardar</button>
                        </td>
                    `;
                    invTableBody.appendChild(tr);
                });

                // Attach update listeners
                document.querySelectorAll('.btn-update-stock').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const id = parseInt(e.target.getAttribute('data-id'));
                        const input = document.querySelector(`.item-stock-input[data-id="${id}"]`);
                        const val = parseInt(input.value);

                        fetch('/api/inventory/update', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id, stock: val })
                        })
                        .then(res => res.json())
                        .then(() => {
                            loadInventory();
                            // Update telemetry log
                            const now = new Date();
                            const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
                            document.getElementById('inventory-telemetry').innerHTML += `
                                <div class="log-line"><span class="log-time">[${timeStr}]</span> <span class="log-info">SYSTEM:</span> Stock actualizado para ítem #${id} a ${val} unidades.</div>
                            `;
                        });
                    });
                });
            });
    }

    loadInventory();

    // Purchasing Optimizer logic
    const btnAnalyze = document.getElementById('btn-analyze-time');
    const analysisEmpty = document.getElementById('analysis-empty');
    const analysisResults = document.getElementById('analysis-results');

    btnAnalyze.addEventListener('click', () => {
        const item = document.getElementById('target-purchase-item').value;
        document.getElementById('res-current-month').textContent = currentMonth;

        const ratingEl = document.getElementById('res-timing-rating');
        const suggestionEl = document.getElementById('res-agent-suggestion');

        if (currentMonthIndex === 9 || currentMonthIndex === 10) {
            ratingEl.textContent = 'MOMENTO ÓPTIMO (Alta Conversión / Apertura Presupuestal)';
            ratingEl.className = 'success-text';
            suggestionEl.textContent = `Aprobar la compra de ${item} de forma inmediata. Las empresas y socios comerciales están abriendo presupuestos fiscales para 2027. La adquisición será deducible y calzará en el ciclo corporativo ideal.`;
        } else {
            ratingEl.textContent = 'ESPERAR A Q4 (Presupuestos del Semestre Agotados)';
            ratingEl.className = 'warn-text';
            suggestionEl.textContent = `Se recomienda aplazar o programar la compra de ${item} en pre-orden para la temporada de Octubre-Noviembre. Vender o comprar infraestructura ahora causará bloqueos comerciales por presupuestos cerrados.`;
        }

        analysisEmpty.classList.add('hidden');
        analysisResults.classList.remove('hidden');

        // Log telemetry
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
        document.getElementById('inventory-telemetry').innerHTML += `
            <div class="log-line"><span class="log-time">[${timeStr}]</span> <span class="log-info">TESIS:</span> Solicitud de análisis de CAPEX para ${item}.</div>
            <div class="log-line"><span class="log-time">[${timeStr}]</span> <span class="log-success">SÍNTESIS:</span> Análisis completado. Recomendación emitida: ${ratingEl.textContent}.</div>
        `;
    });

    // Generate PO
    const btnGeneratePO = document.getElementById('btn-generate-po');
    const poDraftCard = document.getElementById('po-draft-card');
    const poDraftContent = document.getElementById('po-draft-content');

    btnGeneratePO.addEventListener('click', () => {
        const item = document.getElementById('target-purchase-item').value;
        const now = new Date();
        const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

        const draft = `ORDEN DE COMPRA / SOLICITUD DE INFRAESTRUCTURA LOCAL

Fecha: ${formattedDate}
Para: Nvidia Distribuidores / Proveedor Autorizado
Asunto: Adquisición de Infraestructura de Hardware Local para Clúster de Inteligencia Artificial

Estimado Proveedor,

Por medio de la presente, BABYLON.IA solicita de manera formal el borrador de cotización corporativa para el siguiente activo:

- Detalle: ${item}
- Cantidad: 1 Unidad
- Destino de Despliegue: Servidor Local (Confidencialidad Absoluta de Datos)
- Término de Pago: Crédito Presupuestal Fiscal Q4

Agradecemos que nos remita el acuerdo de confidencialidad de la orden de compra adjunto a la factura formal, tal como es exigido por nuestras políticas de seguridad de datos empresariales.

Atentamente,
Agente Autónomo de Compras (BABYLON-INVENTORY-AGENT)
Ecosistema de Operaciones Locales, DOMINUSBABEL.`;

        poDraftContent.textContent = draft;
        poDraftCard.classList.remove('hidden');

        // Scroll to draft
        poDraftCard.scrollIntoView({ behavior: 'smooth' });
    });
});