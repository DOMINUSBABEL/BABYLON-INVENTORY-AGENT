// Configuration settings for physical warehouses
module.exports = {
    WAREHOUSE_ID: "MAIN_BOGOTA_01",
    LOW_STOCK_ALERT_THRESHOLD: 2,
    CHECK_INTERVAL_MINUTES: 15,
    SUPPLIERS: {
        GPU: "nvidia-distributor@local.co",
        SERVERS: "dell-hardware@local.co"
    }
};