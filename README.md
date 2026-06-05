# 📦 BABYLON-INVENTORY-AGENT
## Agente Autónomo de Compras y Control de Inventario
### Ecosistema de Operaciones de Hardware BABYLON.IA (SOTA Framework)

---

## 📌 1. Propósito e Integración de Negocio

El **BABYLON-INVENTORY-AGENT** es el cerebro logístico encargado de asegurar, monitorear y gestionar los activos físicos y de infraestructura tecnológica necesarios para desplegar IAs locales de forma ininterrumpida. 

Este agente actúa bajo la **Primera Ley de Asimov (Preservación del Host)**, monitoreando en tiempo real que los clústers locales de cómputo cuenten con los recursos necesarios (tarjetas de video RTX 4090, SSDs de alto rendimiento, servidores físicos) para evitar cuellos de botella operativos en la pyme.

### 💡 Valor B2B SOTA
* **Predicción de Estacionalidad de Adquisición**: Evalúa la fecha actual frente al ciclo fiscal del cliente y alerta si estamos en la ventana comercial idónea (Q4: Octubre-Noviembre) para proponer una compra capital de hardware (CAPEX) calzando con las deducciones fiscales de fin de año.
* **Auto-Reposición**: Genera borradores comerciales (Requests For Quotation - RFQ) listos para enviar a distribuidores oficiales cuando el stock físico cruza los límites críticos de re-orden.

---

## 📊 2. Algoritmos y Monitoreo de Hardware SOTA

### A. Cálculo de Re-orden Estratégico (Safety Buffer)
El inventario utiliza una fórmula ponderada por el Lead Time (tiempo de entrega del proveedor) para recalcular el stock de seguridad dinámicamente:

$$S_{seguridad} = (Demanda_{promedio} \times LeadTime) \times Multiplicador$$

Donde el `Multiplicador` se ajusta a **1.5** si el Lead Time supera los 10 días, o **1.2** para entregas rápidas, garantizando que el clúster local de desarrollo nunca se quede sin repuestos de hardware críticos.

### B. Telemetría de Servidores Locales
El agente incluye scripts en Python para conectarse a las APIs de monitoreo de hardware (`nvidia-smi` en local) y recopilar telemetría de temperatura y carga de VRAM:

```text
  [ Hardware local GPU ] ──> [ Scraper de Python ] ──> [ Telemetría de stock en DB ]
```

Esto permite estimar la depreciación del hardware y predecir cuándo el clúster local requerirá una expansión o mantenimiento preventivo.

---

## 🔌 3. Integración de Protocolos de Contexto (MCP)

1. **SQLite Inventory MCP (`mcp-servers/sqlite-mcp.json`)**:
   Permite al agente consultar y modificar el stock actual en `db/inventory.sqlite` mediante queries parametrizadas automáticas.
2. **Postgres Assets MCP (`mcp-servers/postgres-mcp.json`)**:
   Para pymes con bases de datos heredadas, este puente de protocolo mapea los activos del clúster de servidores empresariales de forma nativa.
3. **Email Notification MCP (`mcp-servers/email-mcp.json`)**:
   Permite despachar de manera autónoma las solicitudes de cotización a los correos registrados de distribuidores autorizados de hardware (como Nvidia y Dell).

---

## 📁 4. Estructura de Módulos

* `server.js`: Servidor Express para el dashboard.
* `inventory.json`: Base de datos inicial de stock para inicialización rápida.
* `skills/demand-forecasting/`: Algoritmos de predicción de CAPEX y re-orden de stock.
* `skills/supplier-management/`: Compilación de RFQs comerciales automáticos.
* `skills/system-monitoring/`: Conectores locales para temperatura y VRAM.
* `skills/barcode-generation/`: Generador de identificadores SKU.
* `public/`: Front-end interactivo en diseño oscuro y telemetría Geist.

---

## 🚀 5. Instalación y Uso

1. Navegar al directorio de inventario.
2. Instalar los paquetes Node necesarios:
   ```bash
   npm install
   ```
3. Ejecutar el servidor:
   ```bash
   npm start
   ```
4. Acceder al dashboard de inventario en tu navegador local: `http://localhost:4002`
