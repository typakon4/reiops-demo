$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$BotDir = Join-Path $Root "apps\bot"
$VenvPython = Join-Path $BotDir ".venv\Scripts\python.exe"

Set-Location $BotDir

if (!(Test-Path $VenvPython)) {
  python -m venv .venv
}

& $VenvPython -m pip install --upgrade pip
& $VenvPython -m pip install --force-reinstall --no-cache-dir -r requirements.txt
& $VenvPython bot.py
