// Toast notification utility for inventory thresholds
function showStockToast(itemName, currentStock, minStock) {
    const container = document.getElementById('toast-container');
    if (!container) {
        const div = document.createElement('div');
        div.id = 'toast-container';
        div.style.position = 'fixed';
        div.style.bottom = '20px';
        div.style.right = '20px';
        div.style.zIndex = '9999';
        document.body.appendChild(div);
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast-alert';
    toast.style.background = '#ef4444';
    toast.style.color = '#fff';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.marginTop = '10px';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    toast.innerText = `⚠️ ALERTA: ${itemName} stock crítico (${currentStock}/${minStock})`;
    
    document.getElementById('toast-container').appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 4500);
}
