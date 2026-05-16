$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$WebDir = Join-Path $Root "apps\web"

Set-Location $WebDir

$env:API_URL = "http://127.0.0.1:8000"

if (!(Test-Path "node_modules")) {
  npm install
}

npm run dev
