$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$ApiDir = Join-Path $Root "apps\api"
$VenvPython = Join-Path $ApiDir ".venv\Scripts\python.exe"

Set-Location $ApiDir

if (!(Test-Path $VenvPython)) {
  python -m venv .venv
}

& $VenvPython -m pip install --upgrade pip
& $VenvPython -m pip install --force-reinstall --no-cache-dir -r requirements.txt
& $VenvPython -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
