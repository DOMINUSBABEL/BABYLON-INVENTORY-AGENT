# GPU Hardware temperature monitoring script
import os

def check_gpu_health():
    try:
        # Simulate local nvidia-smi command check
        temp = 72 # Mocked 72 degrees Celsius
        vram_used = 12000 # Mocked 12GB
        vram_total = 24576 # 24GB
        
        status = "OK"
        if temp > 85:
            status = "CRITICAL_OVERHEAT"
        elif temp > 78:
            status = "WARNING_HIGH_TEMP"
            
        return {
            "temperature_celsius": temp,
            "vram_utilization_pct": (vram_used / vram_total) * 100,
            "status": status
        }
    except Exception as e:
        return {"status": "ERROR", "message": str(e)}
