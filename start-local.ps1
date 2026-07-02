# Khởi động MongoDB
Start-Process -FilePath "C:\Program Files\MongoDB\Server\8.3\bin\mongod.exe" -ArgumentList "--dbpath `"d:\hackathon\mongodb_data`"" -WindowStyle Hidden

# Khởi động NGINX
Start-Process -FilePath "d:\hackathon\nginx\nginx.exe" -WorkingDirectory "d:\hackathon\nginx" -WindowStyle Hidden

# Khởi động các Microservices
$services = @("auth-service", "unit-service", "activity-service", "attendance-service", "proof-service", "application-service", "notification-service", "ai-service")

foreach ($service in $services) {
    if ($service -eq "ai-service") {
        Start-Process -FilePath "node" -ArgumentList "index.js" -WorkingDirectory "d:\hackathon\services\$service" -WindowStyle Minimized
    } else {
        Start-Process -FilePath "npm" -ArgumentList "run start:dev" -WorkingDirectory "d:\hackathon\services\$service" -WindowStyle Minimized
    }
}

Write-Host "Đã khởi động toàn bộ hệ thống ở chế độ Local (Native Windows)!"
Write-Host "Vui lòng truy cập http://localhost:3000 để sử dụng Web App."
