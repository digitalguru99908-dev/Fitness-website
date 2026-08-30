# Open-Firewall.ps1
# Phone / tablet / kisi bhi LAN device ko site preview ke liye Windows Firewall
# me rules add karta hai:
#   - TCP 5173 (frontend — Vite dev server)
#   - TCP 8080 (backend — API server)
#
# Kaise chalayein: script par RIGHT-CLICK -> "Run with PowerShell" (chuna na ho
# to "Run as administrator" bhi chalega — script khud elevation maang leti hai).
# Baad me ye rules badalne/hatane ke liye:
#   Remove-NetFirewallRule -DisplayName "Infinity Fitness Frontend*" ; similarly backend
#
# Localhots ya push karne ke baad production par iski zaroorat nahee. Ye sirf
# LAN preview (development) ke liye hai.

$ruleNames = @(
  "Infinity Fitness Frontend (5173) TCP",
  "Infinity Fitness Backend (8080) TCP"
)

$localPorts = @("5173", "8080")

# ── Self-elevate: admin na ho to UAC ke through khud restart ────────────────
$principal = [Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  Write-Host "Admin nahi hai — UAC ke through khud ko elevated run kar raha hoon..." -ForegroundColor Yellow
  Start-Process -FilePath "powershell.exe" -Verb RunAs -ArgumentList @(
    "-NoProfile",
    "-ExecutionPolicy", "Bypass",
    "-File", "`"$PSCommandPath`""
  )
  exit
}

for ($i = 0; $i -lt $ruleNames.Count; $i++) {
  $name = $ruleNames[$i]
  $port = $localPorts[$i]

  $existing = netsh advfirewall firewall show rule name=$name
  if ($existing -match $name) {
    Write-Host "Rule pehle se maujood: $name" -ForegroundColor Green
  } else {
    netsh advfirewall firewall add rule name=$name dir=in action=allow protocol=TCP localport=$port profile=any | Out-Null
    Write-Host "Rule added: $name (TCP $port)" -ForegroundColor Green
  }
}

Write-Host ""
Write-Host "Done. Ab phone/tablet par (SAME WiFi) kholein:" -ForegroundColor Cyan
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } | Select-Object -First 1).IPAddress
Write-Host "  -> http://$ip`:5173" -ForegroundColor White
Write-Host ""
Write-Host "(WiFi me laptop ka IP badal sake — IP change ho to aise hi naya milta hai.)"