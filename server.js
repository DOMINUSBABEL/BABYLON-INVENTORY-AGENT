const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock DB path for inventory
const INVENTORY_FILE = path.join(__dirname, 'inventory.json');

const defaultInventory = [
  { id: 1, name: "Nvidia RTX 4090 GPU", category: "Hardware", stock: 1, minStock: 2, unitPrice: 9500000, supplier: "Nvidia Dist." },
  { id: 2, name: "SSD M.2 NVMe 2TB", category: "Almacenamiento", stock: 4, minStock: 3, unitPrice: 850000, supplier: "Crucial CO" },
  { id: 3, name: "Servidor Intel Xeon 64GB", category: "Hardware", stock: 1, minStock: 1, unitPrice: 15400000, supplier: "Dell Latin" },
  { id: 4, name: "Cable Ethernet Cat 8 (10m)", category: "Redes", stock: 2, minStock: 5, unitPrice: 65000, supplier: "Unicentro Tienda" }
];

// Get inventory
app.get('/api/inventory', (req, res) => {
  if (!fs.existsSync(INVENTORY_FILE)) {
    fs.writeFileSync(INVENTORY_FILE, JSON.stringify(defaultInventory, null, 2));
    return res.json(defaultInventory);
  }
  fs.readFile(INVENTORY_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Read error' });
    res.json(JSON.parse(data || '[]'));
  });
});

// Update stock
app.post('/api/inventory/update', (req, res) => {
  const { id, stock } = req.body;
  if (!fs.existsSync(INVENTORY_FILE)) return res.status(404).json({ error: 'No inventory file' });
  
  let inv = JSON.parse(fs.readFileSync(INVENTORY_FILE, 'utf8') || '[]');
  inv = inv.map(item => item.id === id ? { ...item, stock: parseInt(stock) } : item);
  
  fs.writeFileSync(INVENTORY_FILE, JSON.stringify(inv, null, 2));
  res.json({ success: true, item: inv.find(i => i.id === id) });
});

app.listen(PORT, () => {
  console.log(`Inventory Agent Dashboard running at http://localhost:${PORT}`);
});