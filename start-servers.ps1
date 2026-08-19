# Infinity Fitness - Local Dev Startup Script
# ============================================
# Yeh script dono servers ek saath start karti hai:
# 1. API Server (port 8080) - Backend for contact form
# 2. Frontend Dev Server (port 5173) - React website

$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

$root = "C:\Users\LENOVO\Documents\Default Project\Fitness-website-main"
$apiDir = "$root\artifacts\api-server"
$frontendDir = "$root\artifacts\infinity-fitness"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  INFINITY FITNESS - Local Dev Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kill any existing node processes
Write-Host "Cleaning up old processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Start API Server in background
Write-Host "[1/2] Starting API Server on port 8080..." -ForegroundColor Green
$apiJob = Start-Job -ScriptBlock {
    param($dir)
    Set-Location $dir
    node --enable-source-maps ./dist/index.mjs
} -ArgumentList $apiDir

Start-Sleep -Seconds 3

# Start Frontend in background
Write-Host "[2/2] Starting Frontend on port 5173..." -ForegroundColor Green
$feJob = Start-Job -ScriptBlock {
    param($dir)
    Set-Location $dir
    node ./node_modules/vite/bin/vite.js --config vite.config.ts --host 0.0.0.0
} -ArgumentList $frontendDir

Start-Sleep -Seconds 8

# Check status
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  STATUS CHECK" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$apiUp = $false
$feUp = $false

try {
    $resp = Invoke-WebRequest -Uri "http://localhost:8080/api/health" -TimeoutSec 3
    $apiUp = $true
    Write-Host "[API Server]    UP  - http://localhost:8080" -ForegroundColor Green
} catch {
    # Try root
    try {
        $resp = Invoke-WebRequest -Uri "http://localhost:8080/" -TimeoutSec 3
        $apiUp = $true
        Write-Host "[API Server]    UP  - http://localhost:8080" -ForegroundColor Green
    } catch {
        Write-Host "[API Server]    DOWN - Port 8080 not responding" -ForegroundColor Red
        Write-Host "  API Server logs:" -ForegroundColor Yellow
        Receive-Job $apiJob | Select-Object -Last 5
    }
}

try {
    $resp = Invoke-WebRequest -Uri "http://localhost:5173" -TimeoutSec 3
    $feUp = $true
    Write-Host "[Frontend]      UP  - http://localhost:5173" -ForegroundColor Green
} catch {
    Write-Host "[Frontend]      DOWN - Port 5173 not responding" -ForegroundColor Red
    Write-Host "  Frontend logs:" -ForegroundColor Yellow
    Receive-Job $feJob | Select-Object -Last 5
}

Write-Host ""
if ($apiUp -and $feUp) {
    Write-Host "Both servers are running!" -ForegroundColor Green
    Write-Host "Open browser: http://localhost:5173" -ForegroundColor Cyan
    Write-Host "Contact form: http://localhost:5173/contact" -ForegroundColor Cyan
} else {
    Write-Host "Some servers failed. Check logs above." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "To stop all servers: Stop-Process -Name node -Force" -ForegroundColor DarkGray
Write-Host "To see logs: Receive-Job $apiJob" -ForegroundColor DarkGray
