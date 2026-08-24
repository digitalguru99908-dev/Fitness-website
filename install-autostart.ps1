# ============================================================
# Infinity Fitness - ONE-TIME AUTOSTART SETUP
# ============================================================
# Ye script ek baar chalao: Windows me "Infinity Fitness Servers"
# naam ka Scheduled Task register kar deta hai jo har LOGIN par
# start-servers.ps1 (hidden) chala dega.
#
# Isse servers ki zindagi VS Code se BILKUL independent ho jaati hai:
#   - VS Code band karo -> servers chalte rahenge
#   - PC restart -> login hote hi servers khud start
#   - localhost:5173 link HAMESHA chalega
#
# Dobara install karna ho to bas ye script fir se chala do.

$ErrorActionPreference = "Stop"

$taskName = "Infinity Fitness Servers"
$root     = $PSScriptRoot
$user     = "$env:USERDOMAIN\$env:USERNAME"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Autostart Setup - $taskName" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# --- Purana task hatao (agar pehle se hai) ---
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

# --- Task define karo ---
$action = New-ScheduledTaskAction -Execute "powershell.exe" `
    -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$root\start-servers.ps1`"" `
    -WorkingDirectory $root

$trigger   = New-ScheduledTaskTrigger -AtLogOn -User $user
$principal = New-ScheduledTaskPrincipal -UserId $user -LogonType Interactive -RunLevel Limited

# ExecutionTimeLimit Zero = task ko kabhi time-limit se kill na karo
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
    -StartWhenAvailable -ExecutionTimeLimit ([TimeSpan]::Zero)

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger `
    -Principal $principal -Settings $settings | Out-Null

Write-Host "[OK] Scheduled task registered!" -ForegroundColor Green
Write-Host "     Login user : $user"
Write-Host "     Trigger    : PC login (har baar)"
Write-Host "     Action     : start-servers.ps1 (hidden)"
Write-Host ""

# --- Abhi bhi start kar do (taaki restart ka wait na karna pade) ---
Write-Host "Servers abhi start kar raha hoon..." -ForegroundColor Yellow
Start-ScheduledTask -TaskName $taskName

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

$deadline = (Get-Date).AddSeconds(60)
while ((Get-Date) -lt $deadline -and (-not (Test-PortUp 8080) -or -not (Test-PortUp 5173))) {
    Start-Sleep -Milliseconds 800
}

if ((Test-PortUp 8080) -and (Test-PortUp 5173)) {
    Write-Host "[OK] Frontend : http://localhost:5173" -ForegroundColor Green
    Write-Host "[OK] API      : http://localhost:8080/api/healthz" -ForegroundColor Green
} else {
    Write-Host "[!] Kuch servers abhi tak up nahi hue - logs\web-dev.log aur logs\api-server.log dekho." -ForegroundColor Red
}

Write-Host ""
Write-Host "Done! Ab VS Code band karne / PC restart karne par bhi site chalegi." -ForegroundColor Green
Write-Host ""
