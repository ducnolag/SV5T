<div align="center">

# 🎓 Hệ thống Xét duyệt Danh hiệu "Sinh viên 5 Tốt"

**Nền tảng số hóa toàn diện quy trình xét duyệt danh hiệu Sinh viên 5 Tốt các cấp**

[![NestJS](https://img.shields.io/badge/NestJS-11.x-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![NGINX](https://img.shields.io/badge/NGINX-Gateway-009639?style=flat-square&logo=nginx&logoColor=white)](https://nginx.org/)
[![License](https://img.shields.io/badge/License-Hackathon-orange?style=flat-square)](./LICENSE)

</div>

---

## 📋 Mục lục

- [Tổng quan](#-tổng-quan)
- [Tính năng nổi bật](#-tính-năng-nổi-bật)
- [Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
- [Tech Stack](#-tech-stack)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Hướng dẫn cài đặt](#-hướng-dẫn-cài-đặt)
- [Tài khoản kiểm thử](#-tài-khoản-kiểm-thử)
- [Tài liệu kỹ thuật](#-tài-liệu-kỹ-thuật)
- [Giấy phép](#-giấy-phép)

---

## 🌟 Tổng quan

Hệ thống số hóa toàn diện quy trình đăng ký, nộp minh chứng, thẩm định và phê duyệt danh hiệu **"Sinh viên 5 Tốt"** qua 3 cấp (Trường → Tỉnh/Thành phố → Trung ương). Được thiết kế theo kiến trúc **Microservices**, đóng gói trong **10 Docker containers**, khởi chạy toàn bộ bằng **1 lệnh duy nhất**.

---

## 🚀 Tính năng nổi bật

| # | Tính năng | Mô tả |
|---|---|---|
| 🔐 | **VNPT eKYC thực** | Xác thực định danh sinh viên bằng OCR CCCD (mặt trước + mặt sau) + So khớp khuôn mặt (Face Compare) qua API VNPT thật |
| 🏗️ | **Microservices** | 6 services NestJS + 1 AI service Express, giao tiếp qua REST API, chia sẻ chung Prisma schema |
| 📊 | **Dashboard real-time** | Biểu đồ thống kê Recharts + Thông báo WebSocket (Socket.io) |
| 🤖 | **AI Chatbot (RAG)** | Hỏi đáp quy chế SV5T qua Gemini/Groq, tự động chuyển Expert Fallback khi không có API key |
| 🔍 | **AI OCR + Chống gian lận** | Tesseract.js OCR bóc tách minh chứng + Hash MD5 phát hiện nộp trùng lặp |
| 📋 | **Xét duyệt phân cấp 3 tuyến** | Trường → Tỉnh/TP → Trung ương, AI sơ duyệt Cờ Xanh/Vàng/Đỏ hỗ trợ cán bộ |
| 📄 | **Xuất báo cáo PDF** | PDF chuẩn A4 theo từng cấp quản lý |
| 🔔 | **Thông báo real-time** | WebSocket push notification cho mọi sự kiện quan trọng |

---

## 🏗 Kiến trúc hệ thống

```
                    ┌─────────────────────────────────┐
                    │         Internet / Browser       │
                    └────────────────┬────────────────┘
                                     │
                    ┌────────────────▼────────────────┐
                    │   gateway-frontend (NGINX:3000) │
                    │   React SPA + Reverse Proxy     │
                    │   Rate Limiting + WebSocket Up  │
                    └────────────────┬────────────────┘
                                     │
       ┌─────────┬─────────┬─────────┼────────┬─────────┬─────────┐
       │         │         │         │        │         │         │
  ┌────▼───┐┌────▼───┐┌────▼───┐┌────▼───┐┌───▼────┐┌───▼───┐┌────▼───┐
  │  auth  ││  unit  ││activity││ proof  ││applica-││notif- ││   ai   │
  │ :3001  ││ :3002  ││ :3003  ││ :3005  ││tion    ││ication││ :3008  │
  │NestJS  ││NestJS  ││NestJS  ││ NestJS ││:3006   ││:3007  ││Express │
  └───┬────┘└───┬────┘└───┬────┘└────┬───┘└───┬────┘└───┬───┘└────┬───┘
      │         │         │          │        │         │         │
      └─────────┴─────────┴─────┬────┴────────┴────┬────┘         │
                                │                  │              │
                    ┌───────────▼────────┐ ┌───────▼─────┐        │
                    │ PostgreSQL 15      │ │ MongoDB 6   │        │   VNPT APIs
                    │ (Prisma ORM)       │ │ (Audit Log) │        │   Gemini/Groq
                    └────────────────────┘ └─────────────┘        │
                                                           Socket.io
```

---

## 💻 Tech Stack

<table>
<tr>
<td width="50%">

### Frontend
- **React** 19.x + **TypeScript** 6.x
- **Vite** 8.x (Build tool)
- **Tailwind CSS** 3.4
- **Recharts** 3.x (Dashboard)
- **Socket.io Client** 4.x (WebSocket)
- **Lucide React** (Icons)

</td>
<td width="50%">

### Backend
- **NestJS** 11.x (6 services)
- **Express.js** 5.x (AI service)
- **Prisma** ORM (Shared schema)
- **Mongoose** 9.x (MongoDB)
- **Passport + JWT** (Auth)
- **Bcrypt** 6.x (Password hash)
- **Socket.io** 4.x (WebSocket server)

</td>
</tr>
<tr>
<td>

### Database
- **PostgreSQL** 15 Alpine (Relational)
- **MongoDB** 6 Jammy (Audit Log)

</td>
<td>

### Infrastructure
- **Docker** + **Docker Compose** 3.8
- **NGINX** (API Gateway)
- **10 containers** orchestrated

</td>
</tr>
<tr>
<td colspan="2">

### AI & External APIs
- **VNPT eKYC** — OCR CCCD + Face Compare (real integration)
- **VNPT SmartReader** — OCR minh chứng
- **VNPT SmartVoice** — STT/TTS
- **VNPT vnSocial** — Thu thập sự kiện MXH
- **Google Gemini** — RAG Chatbot + Vision
- **Groq** — LLM Fallback

</td>
</tr>
</table>

---

## 📁 Cấu trúc dự án

```
hackathon/
├── frontend-app/               # React 19 + Vite + TailwindCSS
│   └── src/
│       ├── pages/              # 9 pages (Login, Register, Dashboard, ...)
│       ├── components/         # Reusable UI components
│       ├── contexts/           # React Context (Auth, Socket)
│       ├── services/           # Axios API clients
│       └── layouts/            # Page layouts
│
├── services/
│   ├── shared-database/        # 📦 Prisma schema (shared across all services)
│   │   └── prisma/
│   │       ├── schema.prisma   # Source of truth — 7 models, 4 enums
│   │       ├── seed.ts         # Database seed (units, criteria, admin)
│   │       └── create-staff.ts # Create staff accounts
│   │
│   ├── auth-service/           # 🔐 Port 3001 — Auth, eKYC, JWT, OTP
│   ├── unit-service/           # 🏛️ Port 3002 — Units, Rules, Criteria
│   ├── activity-service/       # 📋 Port 3003 — Activities, Approval
│   ├── proof-service/          # 📎 Port 3005 — Evidence, MD5 Hash
│   ├── application-service/    # 📄 Port 3006 — Applications, Review
│   ├── notification-service/   # 🔔 Port 3007 — WebSocket, Socket.io
│   ├── ai-service/             # 🤖 Port 3008 — Chatbot, OCR, RAG
│   └── api-gateway/            # (Legacy — replaced by gateway-frontend)
│
├── gateway-frontend/           # NGINX config + Dockerfile
│   ├── nginx.conf              # Reverse proxy + rate limiting
│   └── Dockerfile              # Build React → Serve via NGINX
│
├── docker-compose.yml          # 🐳 10 containers orchestration
├── .env.example                # Environment variables template
└── section*_*.md               # 📚 Technical documentation
```

---

## 🛠 Hướng dẫn cài đặt

### Yêu cầu hệ thống

| Yêu cầu | Chi tiết |
|---|---|
| **Docker Desktop** | Đã cài đặt và đang chạy |
| **RAM** | Khuyến nghị ≥ 8GB |
| **Disk** | ≥ 5GB trống (Docker images) |
| **Port** | `3000` chưa bị chiếm |

### Khởi chạy (3 bước)

**Bước 1 — Clone & cấu hình môi trường:**

```bash
git clone <repository-url>
cd hackathon

# Tạo file .env từ template
# Windows:
copy .env.example .env
copy services\ai-service\.env.example services\ai-service\.env

# Linux/macOS:
cp .env.example .env
cp services/ai-service/.env.example services/ai-service/.env
```

> 💡 **Mẹo:** Mở file `services/ai-service/.env` và điền `GEMINI_API_KEY` hoặc `GROQ_API_KEY` để kích hoạt AI Chatbot. Nếu bỏ trống, hệ thống tự động chuyển sang chế độ Expert Fallback.

**Bước 2 — Khởi chạy toàn bộ hệ thống:**

```bash
docker-compose up -d --build
```

> ⏱️ Build lần đầu mất khoảng **3–5 phút** (compile 6 NestJS services + React Frontend + tự động nạp dữ liệu vào PostgreSQL & MongoDB).

**Bước 3 — Truy cập & trải nghiệm:**

```bash
# Kiểm tra trạng thái
docker-compose ps

# Truy cập web app
# 👉 http://localhost:3000
```

### Dừng hệ thống

```bash
# Dừng containers (giữ dữ liệu)
docker-compose down

# Dừng + xóa sạch dữ liệu (reset hoàn toàn)
docker-compose down -v
```

---

## 👤 Tài khoản kiểm thử

Hệ thống tự động tạo sẵn các tài khoản khi khởi động:

| Email | Vai trò | Mật khẩu |
|---|---|---|
| `admin@sv5t.vn` | Quản trị viên (ADMIN) | `Admin@123` |
| `cbtw@sv5t.vn` | Cán bộ Trung ương (CB_TW) | `Admin@123` |
| `cbtinh@sv5t.vn` | Cán bộ Tỉnh/TP (CB_TINH) | `Admin@123` |
| `cbtruong@sv5t.vn` | Cán bộ Trường (CB_TRUONG) | `Admin@123` |

> 💡 **Tính năng Quên mật khẩu:** Khi chưa cấu hình SMTP, mã OTP 6 số sẽ được hiển thị trực tiếp trên thông báo màn hình web.

> 🔄 **Restart Gateway:** Nếu vừa khởi động lại một service riêng lẻ, chạy `docker-compose restart gateway-frontend` để NGINX cập nhật IP nội bộ.

---

## ☁️ Triển khai Production

Vì dự án mang quy mô Microservices (10 containers), khuyến nghị triển khai trên **VPS** có cấu hình đủ mạnh:

```bash
# 1. SSH vào VPS
ssh user@your-server

# 2. Cài đặt Docker
sudo apt update && sudo apt install docker.io docker-compose -y
sudo usermod -aG docker $USER

# 3. Clone & chạy
git clone <repository-url> && cd hackathon
cp .env.example .env
cp services/ai-service/.env.example services/ai-service/.env
docker-compose up -d --build

# 4. Mở firewall port 3000
# 5. Trỏ domain về IP VPS
```

> 💡 Khuyến nghị: [Oracle Cloud Always Free](https://www.oracle.com/cloud/free/) — 4 ARM Cores, 24GB RAM.


---

## 📝 Giấy phép

Dự án được xây dựng phục vụ cuộc thi Hackathon.

© 2026 Bản quyền thuộc về đội ngũ phát triển dự án.
