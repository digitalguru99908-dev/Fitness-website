# ============================================================
# Infinity Fitness - Local Dev Startup (DETACHED MODE)
# ============================================================
# Dono servers HIDDEN detached processes ban kar start hote hain,
# isliye VS Code / terminal band hone par bhi ye chalte rehte hain.
# Sirf PC restart ya stop-servers.ps1 se rukte hain.
#
#   Frontend : http://localhost:5173
#   API      : http://localhost:8080/api/healthz
#   Logs     : .\logs\api-server.log , .\logs\web-dev.log
#   Stop     : .\stop-servers.ps1

$ErrorActionPreference = "SilentlyContinue"

$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

$root        = $PSScriptRoot
$apiDir      = Join-Path $root "artifacts\api-server"
$frontendDir = Join-Path $root "artifacts\infinity-fitness"
$logDir      = Join-Path $root "logs"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  INFINITY FITNESS - Starting Servers" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

function Test-PortUp {
    param([int]$Port)
    $client = New-Object Net.Sockets.TcpClient
    try {
        $client.Connect("127.0.0.1", $Port)
        return $client.Connected
    } catch {
        return $false
    } finally {
        $client.Close()
    }
}

function Stop-PortListener {
    param([int]$Port)
    $procIds = @()
    try {
        $procIds = @(Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue |
            Select-Object -ExpandProperty OwningProcess -Unique)
    } catch {}
    if (-not $procIds) {
        $lines = netstat -ano | Select-String ":$Port\s"
        foreach ($line in $lines) {
            $parts = ($line.ToString().Trim() -split '\s+')
            if ($parts[-2] -eq 'LISTENING') { $procIds += [int]$parts[-1] }
        }
    }
    foreach ($procId in ($procIds | Select-Object -Unique)) {
        if ($procId -and $procId -ne 0) {
            Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
        }
    }
}

# --- Step 1: Purane servers / stale processes ko ports se hatao ---
Write-Host "[1/4] Cleaning up old processes on ports 8080 & 5173..." -ForegroundColor Yellow
Stop-PortListener -Port 8080
Stop-PortListener -Port 5173
Start-Sleep -Seconds 1

# --- Step 2: Logs folder fresh karo ---
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
Remove-Item (Join-Path $logDir "*.log") -Force -ErrorAction SilentlyContinue

# --- Step 3: API dist build hai? Nahi to ek baar build karo ---
if (-not (Test-Path (Join-Path $apiDir "dist\index.mjs"))) {
    Write-Host "[2/4] API build missing - building once..." -ForegroundColor Yellow
    Push-Location $apiDir
    & pnpm run build 2>&1 | Out-Null
    Pop-Location
}

# --- Step 4: Dono servers ko HIDDEN detached processes me start karo ---
# (cmd.exe ke through isliye ki console close hone par bhi process zinda rahe)
Write-Host "[3/4] Starting API Server (port 8080)..." -ForegroundColor Green
Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/c", "`"$root\scripts\dev-api.cmd`"" `
    -WorkingDirectory $root -WindowStyle Hidden

Write-Host "[4/4] Starting Frontend (port 5173)..." -ForegroundColor Green
Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/c", "`"$root\scripts\dev-web.cmd`"" `
    -WorkingDirectory $root -WindowStyle Hidden

# --- Step 5: Dono ports ke live hone ka wait + status ---
$deadline = (Get-Date).AddSeconds(45)
while ((Get-Date) -lt $deadline -and (-not (Test-PortUp -Port 8080) -or -not (Test-PortUp -Port 5173))) {
    Start-Sleep -Milliseconds 800
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  STATUS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$apiUp = Test-PortUp -Port 8080
$feUp  = Test-PortUp -Port 5173

if ($feUp) {
    Write-Host "[Frontend]  UP  ->  http://localhost:5173" -ForegroundColor Green
} else {
    Write-Host "[Frontend]  DOWN - log dekho: logs\web-dev.log" -ForegroundColor Red
}
if ($apiUp) {
    Write-Host "[API]       UP  ->  http://localhost:8080/api/healthz" -ForegroundColor Green
} else {
    Write-Host "[API]       DOWN - log dekho: logs\api-server.log" -ForegroundColor Red
}

Write-Host ""
if ($apiUp -and $feUp) {
    Write-Host "Done! Ye script band kar sakte ho - servers background me chaleinge." -ForegroundColor Green
    Write-Host "VS Code band karke wapas kholo tab bhi site chalegi." -ForegroundColor Green
} else {
    Write-Host "Kuch servers start nahi hue - upar diye logs check karo." -ForegroundColor Yellow
}
Write-Host ""
