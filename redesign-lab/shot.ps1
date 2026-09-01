# Headless screenshot helper - lets the agent SEE any URL (bypasses the Chrome extension permission wall).
# Usage:  powershell -File redesign-lab/shot.ps1 -Url "https://site.com" -Out "$env:TEMP\x.png" -W 1366 -H 1600
# Then Read the PNG. For more of a tall page, raise -H (e.g. 4000). Classic --headless (NOT --headless=new).
param(
  [Parameter(Mandatory=$true)][string]$Url,
  [string]$Out = "$env:TEMP\shot.png",
  [int]$W = 1366,
  [int]$H = 1600,
  [int]$WaitMs = 12000
)
$chrome = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
  "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $chrome) { "ERROR: no Chrome/Edge binary found"; exit 1 }
Remove-Item $Out -ErrorAction SilentlyContinue
$a = @('--headless','--disable-gpu','--no-sandbox','--hide-scrollbars',"--window-size=$W,$H","--virtual-time-budget=$WaitMs","--screenshot=$Out",$Url)
Start-Process -FilePath $chrome -ArgumentList $a -NoNewWindow -Wait | Out-Null
if (Test-Path $Out) { "OK: $Out ($([math]::Round((Get-Item $Out).Length/1KB)) KB)" } else { "FAILED" }
