# ============================================================
# Infinity Fitness - Stop Local Dev Servers (ports 8080 & 5173)
# ============================================================

$ErrorActionPreference = "SilentlyContinue"

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

foreach ($port in 8080, 5173) {
    if (Test-PortUp -Port $port) {
        Stop-PortListener -Port $port
        Write-Host "Stopped server on port $port" -ForegroundColor Yellow
    }
}

Start-Sleep -Seconds 1

if ((Test-PortUp -Port 8080) -or (Test-PortUp -Port 5173)) {
    Write-Host "Kuch processes abhi bhi chal rahe hain - dobara try karo." -ForegroundColor Red
} else {
    Write-Host "All servers stopped." -ForegroundColor Green
}
Write-Host ""
