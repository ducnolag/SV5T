# Stop Nginx
Get-Process nginx -ErrorAction SilentlyContinue | Stop-Process -Force

# Stop MongoDB
Get-Process mongod -ErrorAction SilentlyContinue | Stop-Process -Force

# Stop all node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "Killed all local services."
