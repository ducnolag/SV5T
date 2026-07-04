# Hệ thống Xét duyệt Danh hiệu "Sinh viên 5 tốt"

![SV5T Logo](frontend-app/public/favicon.png)

Hệ thống số hóa toàn diện quy trình đăng ký, nộp minh chứng, thẩm định và phê duyệt danh hiệu "Sinh viên 5 tốt" các cấp (Cấp Trường - Cấp Tỉnh/Thành phố - Cấp Trung ương). Dự án được thiết kế theo kiến trúc Microservices hiện đại, khả năng mở rộng cao và đảm bảo hiệu năng.

## 🚀 Tính năng nổi bật

- **Kiến trúc Vi dịch vụ (Microservices):** Tách biệt các domain (Auth, Unit, Activity, Application...) đảm bảo tính module hóa và dễ dàng mở rộng.
- **Quy trình phân cấp phê duyệt:** Hỗ trợ quy trình nghiệp vụ chặt chẽ, từ Trường -> Thành phố -> Trung ương.
- **Chống gian lận (AI/Hash):** Tự động băm (hashing) file minh chứng để phát hiện nộp trùng lặp; tích hợp AI cảnh báo nộp sai tiêu chí (tự nhận diện hình ảnh/chứng nhận).
- **E-KYC:** Định danh sinh viên.
- **Real-time WebSockets:** Thông báo thời gian thực trạng thái hồ sơ.
- **Thống kê & Báo cáo:** Tự động sinh biểu đồ, theo dõi tỷ lệ hồ sơ, xuất báo cáo PDF chuẩn in ấn A4.

## 💻 Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Recharts.
- **Backend:** NestJS, Socket.io, Prisma ORM, Mongoose.
- **Database:** PostgreSQL 15 (Relational Data), MongoDB 6 (Log & Audit Data).
- **Gateway & Proxy:** NGINX.
- **Containerization:** Docker & Docker Compose.

---

## 🏗 Kiến trúc Hệ thống (Architecture)

Hệ thống bao gồm các dịch vụ sau, giao tiếp thông qua RESTful APIs và chạy độc lập trong các Docker containers:

1. **`gateway-frontend`** (Port `3000`): API Gateway (NGINX) điều hướng request, đồng thời phục vụ (serve) bộ React Frontend.
2. **`auth-service`** (Port `3001`): Quản lý người dùng, phân quyền (RBAC), E-KYC.
3. **`unit-service`** (Port `3002`): Quản lý cấu trúc đơn vị trực thuộc, trường học, tỉnh/thành.
4. **`activity-service`** (Port `3003`): Quản lý các hoạt động phong trào, điểm danh.
5. **`attendance-service`** (Port `3004`): Ghi nhận tham gia, check-in mã QR.
6. **`proof-service`** (Port `3005`): Quản lý file lưu trữ minh chứng, băm MD5 chống gian lận.
7. **`application-service`** (Port `3006`): Lõi nghiệp vụ nộp/duyệt hồ sơ.
8. **`notification-service`** (Port `3007`): Gửi thông báo WebSockets / Email.

---

## 🛠 Hướng dẫn Khởi chạy (Local Development)

### 📋 Yêu cầu hệ thống
- **Docker** và **Docker Compose** đã được cài đặt (trên Windows cần mở ứng dụng Docker Desktop).
- Node.js >= 20.x (nếu muốn test hay thao tác với các gói NPM).

### 🚀 Chạy toàn bộ hệ thống bằng 1 lệnh (Được khuyến nghị)

Dự án đã được cấu hình chuẩn tối ưu hóa cho Docker Compose, bao gồm tự động khởi tạo cơ sở dữ liệu PostgreSQL & MongoDB, đồng bộ hóa phiên bản Prisma ORM và đóng gói 8 dịch vụ Microservices + Gateway Frontend.

1. Mở terminal tại thư mục gốc dự án:
```bash
cd D:\hackathon
```

2. Build và khởi chạy toàn bộ 11 containers ngầm:
```bash
docker-compose up -d --build
```
*(Hoặc dùng `docker compose up -d --build` nếu dùng Docker CLI mới)*
*(Lưu ý: Quá trình build lần đầu tiên mất khoảng 3 - 5 phút để compile NestJS và nạp cơ sở dữ liệu)*

3. Kiểm tra trạng thái hoạt động:
```bash
docker-compose ps
```
Khi toàn bộ 11 container đều hiển thị trạng thái **Up / Running**, hệ thống đã sẵn sàng!

4. Truy cập và trải nghiệm Hệ thống:
- 👉 **Web App & Gateway:** [http://localhost:3000](http://localhost:3000)

### 💡 Lưu ý quan trọng & Tài khoản kiểm thử (Hackathon Tip)
- **Tài khoản mặc định trong DB:** Bạn có thể dùng các email như `admin@sv5t.vn`, `cbtw@sv5t.vn`, `cbtinh@sv5t.vn`, `cbtruong@sv5t.vn` (Mật khẩu: `@Duclag123` / `Admin@123` hoặc dùng tính năng Quên mật khẩu để đặt lại).
- **Tính năng Quên mật khẩu:** Để thuận tiện cho hội đồng kiểm thử Hackathon mà không cần cấu hình Mail Server thực tế (SMTP), mã xác thực OTP (6 số) sẽ được hệ thống tự động sinh và **hiển thị trực tiếp trên thông báo màn hình web** khi bạn nhập email hợp lệ.
- **Làm mới kết nối Gateway:** Nếu bạn vừa khởi động lại một dịch vụ riêng lẻ trong Docker, hãy chạy lệnh `docker-compose restart gateway-frontend` để NGINX cập nhật lại bảng định danh IP nội bộ mới nhất.

### 🛑 Dừng hệ thống
```bash
docker-compose down
```
*(Thêm cờ `-v` nếu bạn muốn xóa sạch toàn bộ dữ liệu Database để khởi tạo lại từ đầu: `docker-compose down -v`)*
---

## ☁️ Hướng dẫn Triển khai (Production Deployment)

Vì dự án mang quy mô Microservices, không nên sử dụng các nền tảng miễn phí có cấu hình thấp (như Vercel/Render). Bạn nên triển khai hệ thống lên một **VPS** (Khuyên dùng [Oracle Cloud Always Free](https://www.oracle.com/cloud/free/) với cấu hình 4 ARM Cores, 24GB RAM).

### Các bước cơ bản:
1. SSH vào VPS của bạn.
2. Cài đặt Docker: `sudo apt install docker.io docker-compose -y` && `sudo usermod -aG docker $USER`.
3. Clone mã nguồn về VPS.
4. Chạy `docker-compose up -d --build`.
5. Đảm bảo Firewall của VPS (và Cloud Console) đã cho phép truy cập Ingress vào Port `3000`.
6. Trỏ Domain của bạn về IP của VPS và tận hưởng!

---

## 📝 Giấy phép (License)
Dự án được xây dựng phục vụ cuộc thi Hackathon.
© 2026 Bản quyền thuộc về đội ngũ phát triển dự án.
