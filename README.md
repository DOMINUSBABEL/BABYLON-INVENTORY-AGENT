# 📦 BABYLON-INVENTORY-AGENT
## Agente Autónomo de Compras y Control de Inventario
### Ecosistema de Operaciones de Hardware BABYLON.IA (SOTA Framework)

---

## 📌 1. Propósito e Integración de Negocio

El **BABYLON-INVENTORY-AGENT** es el cerebro logístico encargado de asegurar, monitorear y gestionar los activos físicos y de infraestructura tecnológica necesarios para desplegar IAs locales de forma ininterrumpida.

Este agente actúa bajo la **Primera Ley de Asimov (Preservación del Host)**, monitoreando en tiempo real que los clústers locales de cómputo cuenten con los recursos necesarios (tarjetas de video RTX 4090, SSDs de alto rendimiento, servidores físicos) para evitar cuellos de botella operativos en la pyme.

### 💡 Valor B2B SOTA
* **Predicción de Estacionalidad de Adquisición**: Evalúa la fecha actual frente al ciclo fiscal del cliente y alerta si estamos en la ventana comercial idónea (Q4: Octubre-Noviembre) para proponer una compra capital de hardware (CAPEX) calzando con las deudas fiscales de fin de año.
* **Auto-Reposición**: Genera borradores comerciales (Requests For Quotation - RFQ) listos para enviar a distribuidores oficiales cuando el stock físico cruza los límites críticos de re-orden.

---

## 📊 2. Algoritmos y Monitoreo de Hardware SOTA

### A. Cálculo de Re-orden Estratégico (Safety Buffer)
El inventario utiliza una fórmula ponderada por el Lead Time (tiempo de entrega del proveedor) para recalcular el stock de seguridad dinámicamente:

$$S_{seguridad} = (Demanda_{promedio} \times LeadTime) \times Multiplicador$$

Donde el `Multiplicador` se ajusta a **1.5** si el Lead Time supera los 10 días, o **1.2** para entregas rápidas.

### B. Optimización del Lote Económico de Compra (Economic Order Quantity)
Para minimizar el costo total de ordenar y almacenar inventario de hardware en bodega, el agente calcula dinámicamente el lote óptimo mediante la fórmula de Wilson (EOQ):

$$Q^* = \sqrt{\frac{2DS}{H}}$$

Donde:
* $Q^*$ es la cantidad óptima por pedido (Economic Order Quantity).
* $D$ es la demanda anual de repuestos (e.g. 1000 tarjetas GPU).
* $S$ es el costo operativo de montar una orden al proveedor.
* $H$ es el costo de mantener una unidad en bodega anualmente.

### C. Telemetría de Servidores Locales (GPU Metrics Scraper)
El script en Python se conecta con el controlador nvidia-smi para registrar métricas de carga operativa y estado de temperatura:

```text
  [ Hardware local GPU ] ──> [ Scraper de Python ] ──> [ Telemetría de stock en DB ]
```

El software dispara alertas cuando la temperatura sobrepasa el umbral de seguridad de los 78°C para evitar la degradación del silicio.

---

## 🔌 3. Integración de Protocolos de Contexto (MCP)

1. **SQLite Inventory MCP (`mcp-servers/sqlite-mcp.json`)**:
   Permite al agente consultar y modificar el stock actual en `db/inventory.sqlite` mediante queries parametrizadas automáticas. Con control de cantidad máxima de filas (`MaxRows: 500`).
2. **Postgres Assets MCP (`mcp-servers/postgres-mcp.json`)**:
   Para pymes con bases de datos heredadas, este puente de protocolo mapea los activos del clúster de servidores de manera nativa.
3. **Email Notification MCP (`mcp-servers/email-mcp.json`)**:
   Permite despachar de manera autónoma las solicitudes de cotización a los correos registrados de distribuidores autorizados de hardware.

---

## 📁 4. Estructura de Módulos

```text
C:\Users\jegom\BABYLON-INVENTORY-AGENT\
├── package.json
├── server.js
├── inventory.json
├── .env.example
├── db/
│   ├── schema.sql
│   └── init_db.js
├── mcp-servers/
│   ├── sqlite-mcp.json
│   └── postgres-mcp.json
├── config/
│   └── inventory.js
├── routes/
│   └── inventory.js
├── skills/
│   ├── demand-forecasting/
│   │   └── replenishment.js
│   ├── supplier-management/
│   │   └── rfq_generator.js
│   └── system-monitoring/
│       └── gpu_metrics.py
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── tests/
    └── inventory.test.js
```

---

## 🚀 5. Instalación y Uso en Entornos Locales

1. Navegar al directorio de inventario.
2. Instalar los paquetes Node necesarios:
   ```bash
   npm install
   ```
3. Ejecutar las pruebas para validar la calibración matemática del EOQ:
   ```bash
   npm test
   ```
4. Levantar la aplicación local:
   ```bash
   npm start
   ```
5. Acceder al dashboard de inventario en tu navegador local: `http://localhost:4002`
