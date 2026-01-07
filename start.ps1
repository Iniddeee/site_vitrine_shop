Write-Host "Lancement du site vitrine..." -ForegroundColor Green
Write-Host ""
Set-Location $PSScriptRoot
npm run dev
Read-Host "Appuyez sur Entrée pour quitter"
