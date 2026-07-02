## V. THIẾT KẾ KIẾN TRÚC HỆ THỐNG

---

### 5.1. Tổng quan kiến trúc

Hệ thống quản lý Sinh viên 5 Tốt được thiết kế theo mô hình **Microservices** kết hợp **API Gateway** — đảm bảo khả năng mở rộng độc lập từng nghiệp vụ, tích hợp linh hoạt với hệ sinh thái AI của VNPT, và duy trì tính ổn định khi một dịch vụ xảy ra sự cố.

| Nguyên tắc | Mô tả |
|:---|:---|
| **Separation of Concerns** | Mỗi Microservice đảm nhận đúng 1 nghiệp vụ |
| **API-First** | Tất cả giao tiếp qua REST API / WebSocket |
| **Polyglot Persistence** | PostgreSQL + MongoDB tuỳ từng service |
| **Graceful Degradation** | AI hỏng → nghiệp vụ lõi vẫn chạy bình thường |
| **Event-Driven** | Thông báo, deadline tự động qua Message Queue |

---

### 5.2. Mô hình C4 — Cấp độ 1: Sơ đồ Ngữ cảnh (Context Diagram)

> Mô tả: Hệ thống SV5T tương tác với ai và với hệ thống nào ở bức tranh toàn cảnh.

```mermaid
graph TD
    SV["👤 Sinh viên\n(Mobile/Web App)"]
    DV["🏛️ Đơn vị tổ chức\n(Web App)"]
    CB["🔑 Cán bộ Hội\n(Web App)"]
    AD["⚙️ Admin\n(Web Admin)"]

    SYS["🖥️ Hệ thống SV5T\n[Software System]"]

    eKYC["VNPT eKYC\n[External System]"]
    vnFace["VNPT vnFace\n[External System]"]
    SR["VNPT SmartReader\n[External System]"]
    SV5["VNPT SmartVision\n[External System]"]
    SB["VNPT Smartbot\n[External System]"]
    SVoice["VNPT SmartVoice\n[External System]"]
    vnS["VNPT vnSocial\n[External System]"]
    Email["Email Server\n[External System]"]

    SV -->|"Đăng ký, nộp hồ sơ,\nupload minh chứng"| SYS
    DV -->|"Tạo hoạt động,\nđiểm danh"| SYS
    CB -->|"Duyệt hoạt động,\nxét duyệt hồ sơ"| SYS
    AD -->|"Cấu hình hệ thống"| SYS

    SYS -->|"Xác thực CCCD + khuôn mặt"| eKYC
    SYS -->|"Nhận diện khuôn mặt\n(điểm danh)"| vnFace
    SYS -->|"OCR bóc tách minh chứng"| SR
    SYS -->|"Đối soát ảnh tập thể"| SV5
    SYS -->|"Hỏi đáp quy chế (RAG)"| SB
    SYS -->|"Chuyển đổi giọng nói (STT/TTS)"| SVoice
    SYS -->|"Thu thập sự kiện mạng xã hội"| vnS
    SYS -->|"Gửi email nhắc deadline"| Email
```

---

### 5.3. Mô hình C4 — Cấp độ 2: Sơ đồ Container (Container Diagram)

> Mô tả: Bên trong hệ thống SV5T gồm những container (ứng dụng, CSDL, message queue) nào.

```mermaid
graph TB
    subgraph CLIENT["Lớp Client (Frontend)"]
        WEB["Web App\n[React / Next.js]\nDành cho: Sinh viên,\nCán bộ Hội, Đơn vị"]
        ADMIN_UI["Admin Panel\n[React]\nDành cho: Quản trị viên"]
    end

    subgraph GATEWAY["API Gateway Layer"]
        GW["API Gateway\n[Nginx / Kong]\n- Routing\n- Auth JWT\n- Rate Limiting\n- Load Balancing"]
    end

    subgraph SERVICES["Microservices Layer"]
        AUTH["Auth Service\n[Node.js]\n- Đăng ký / Đăng nhập\n- eKYC\n- JWT"]
        UNIT["Unit Service\n[Node.js]\n- Quản lý đơn vị\n- Phân cấp\n- Quy chế năm học"]
        ACTIVITY["Activity Service\n[Node.js]\n- Tạo / Duyệt hoạt động\n- Tiêu chí SV5T"]
        ATTEND["Attendance Service\n[Node.js]\n- vnFace WebRTC\n- Upload Excel MSV\n- Chốt danh sách"]
        PROOF["Proof Service\n[Node.js]\n- Upload minh chứng\n- OCR SmartReader\n- Duyệt / Loại"]
        APP["Application Service\n[Node.js]\n- Hồ sơ SV5T\n- AI sơ duyệt\n- Xét duyệt phân cấp"]
        AI["AI Service\n[Python / FastAPI]\n- Chatbot RAG\n- Gợi ý hoạt động\n- SmartVoice STT/TTS"]
        NOTIF["Notification Service\n[Node.js]\n- Nhắc deadline\n- Push + Email\n- Cron job"]
        STATS["Stats Service\n[Node.js]\n- Dashboard real-time\n- Xuất Excel/PDF"]
    end

    subgraph DATA["Data Layer"]
        PG[("PostgreSQL\nDữ liệu lõi")]
        MONGO[("MongoDB\nLog, OCR, Chat")]
        REDIS[("Redis\nSession, Cache")]
        MQ["Message Queue\n[RabbitMQ / Redis Pub-Sub]\nSự kiện bất đồng bộ"]
        FS["File Storage\n[MinIO / S3-compatible]\nFile minh chứng"]
    end

    WEB --> GW
    ADMIN_UI --> GW
    GW --> AUTH
    GW --> UNIT
    GW --> ACTIVITY
    GW --> ATTEND
    GW --> PROOF
    GW --> APP
    GW --> AI
    GW --> NOTIF
    GW --> STATS

    AUTH --> PG
    AUTH --> REDIS
    UNIT --> PG
    ACTIVITY --> PG
    ATTEND --> PG
    PROOF --> PG
    PROOF --> MONGO
    PROOF --> FS
    APP --> PG
    APP --> MONGO
    AI --> MONGO
    NOTIF --> MONGO
    STATS --> PG

    ACTIVITY --> MQ
    APP --> MQ
    PROOF --> MQ
    MQ --> NOTIF
```

---

### 5.4. Mô hình C4 — Cấp độ 3: Sơ đồ Component (Component Diagram)

> Mô tả chi tiết bên trong **Application Service** — service phức tạp nhất (xử lý toàn bộ luồng hồ sơ SV5T).

```mermaid
graph TB
    GW["API Gateway"]

    subgraph APP_SVC["Application Service"]
        CTRL["Application Controller\n(REST API endpoints)"]
        GUARD["Auth Guard\n(Kiểm tra JWT & Role)"]
        SUBMIT["Submit Handler\n(Tiếp nhận hồ sơ,\nKhóa sau khi nộp - BR02)"]
        AI_MOD["AI Pre-screening Module\n(Phân loại Cờ Xanh/Vàng/Đỏ)"]
        REVIEW["Review Handler\n(Cán bộ Duyệt / Từ chối - BR03)"]
        BATCH["Batch Escalation\n(Gom hồ sơ trình tuyến trên)"]
        STATUS["Status Machine\n(Quản lý trạng thái hồ sơ)"]
        LOG["Audit Logger\n(Ghi log mọi thao tác - BR09)"]
    end

    PG[("PostgreSQL")]
    MONGO[("MongoDB")]
    MQ["Message Queue"]
    AI_SVC["AI Service"]

    GW --> CTRL
    CTRL --> GUARD
    GUARD --> SUBMIT
    GUARD --> REVIEW
    GUARD --> BATCH
    SUBMIT --> STATUS
    SUBMIT --> AI_MOD
    AI_MOD --> AI_SVC
    AI_SVC --> AI_MOD
    AI_MOD --> STATUS
    REVIEW --> STATUS
    BATCH --> STATUS
    STATUS --> PG
    STATUS --> LOG
    LOG --> MONGO
    BATCH --> MQ
    REVIEW --> MQ
```

---

### 5.5. Luồng tích hợp VNPT API

> Mô tả luồng dữ liệu giữa các service nội bộ và hệ sinh thái VNPT AI.

```mermaid
sequenceDiagram
    participant FE as Frontend (Web App)
    participant GW as API Gateway
    participant SVC as Internal Service
    participant VNPT as VNPT AI Ecosystem

    Note over FE, VNPT: Luồng 1 — Đăng ký tài khoản (eKYC)
    FE->>GW: POST /auth/register + CCCD ảnh + Selfie
    GW->>SVC: Auth Service
    SVC->>VNPT: VNPT eKYC API (xác thực CCCD + liveness)
    VNPT-->>SVC: Kết quả xác thực
    SVC-->>FE: Tạo tài khoản thành công

    Note over FE, VNPT: Luồng 2 — Điểm danh khuôn mặt (vnFace)
    FE->>GW: WebRTC stream ảnh khuôn mặt
    GW->>SVC: Attendance Service
    SVC->>VNPT: VNPT vnFace API (nhận diện < 2 giây)
    VNPT-->>SVC: MSV sinh viên được nhận diện
    SVC-->>FE: Cập nhật danh sách real-time

    Note over FE, VNPT: Luồng 3 — Upload minh chứng (SmartReader OCR)
    FE->>GW: POST /proofs + File PDF/JPG
    GW->>SVC: Proof Service
    SVC->>VNPT: VNPT SmartReader API (OCR bóc tách)
    VNPT-->>SVC: Họ tên, Ngày cấp, Loại chứng chỉ
    SVC-->>FE: Gợi ý tiêu chí phù hợp

    Note over FE, VNPT: Luồng 4 — Chatbot hỏi đáp (Smartbot RAG)
    FE->>GW: POST /ai/chat + Câu hỏi (text/voice)
    GW->>SVC: AI Service
    SVC->>VNPT: SmartVoice STT (nếu giọng nói)
    VNPT-->>SVC: Văn bản câu hỏi
    SVC->>VNPT: Smartbot RAG (truy xuất Knowledge Base)
    VNPT-->>SVC: Câu trả lời + nguồn trích dẫn
    SVC->>VNPT: SmartVoice TTS (nếu cần đọc lại)
    VNPT-->>SVC: Audio file
    SVC-->>FE: Phản hồi text + audio
```

---

### 5.6. Luồng sự kiện bất đồng bộ (Event-Driven)

> Các sự kiện quan trọng được đẩy vào Message Queue để xử lý bất đồng bộ, đảm bảo không block luồng nghiệp vụ chính.

```mermaid
graph LR
    subgraph PRODUCERS["Producers (Phát sự kiện)"]
        A1["Activity Service\n→ activity.approved"]
        A2["Application Service\n→ application.submitted\n→ application.reviewed"]
        A3["Proof Service\n→ proof.rejected"]
        A4["Unit Service\n→ deadline.configured"]
    end

    MQ[["Message Queue\n(RabbitMQ)"]]

    subgraph CONSUMERS["Consumers (Xử lý sự kiện)"]
        N1["Notification Service\n← Gửi Push + Email"]
        N2["Stats Service\n← Cập nhật Dashboard"]
        N3["Audit Service\n← Ghi Audit Log (MongoDB)"]
    end

    A1 --> MQ
    A2 --> MQ
    A3 --> MQ
    A4 --> MQ

    MQ --> N1
    MQ --> N2
    MQ --> N3
```

**Bảng danh sách sự kiện:**

| Tên sự kiện | Publisher | Consumer | Mô tả |
|:---|:---|:---|:---|
| `activity.approved` | Activity Service | Notification Service | Thông báo cho sinh viên hoạt động mới |
| `activity.closed` | Attendance Service | Stats Service | Cập nhật thống kê sau khi chốt điểm danh |
| `application.submitted` | Application Service | Notification Service, AI Service | Kích hoạt AI sơ duyệt sau khi hồ sơ được nộp |
| `application.reviewed` | Application Service | Notification Service | Thông báo kết quả duyệt đến sinh viên |
| `proof.rejected` | Proof Service | Notification Service | Thông báo minh chứng bị loại |
| `deadline.configured` | Unit Service | Notification Service | Lập lịch toàn bộ chuỗi nhắc deadline (BR01) |

---

### 5.7. Chiến lược triển khai (Deployment Architecture)

```mermaid
graph TB
    subgraph INTERNET["Internet"]
        USER["👤 Người dùng\n(Browser / Mobile)"]
    end

    subgraph CDN["CDN Layer"]
        CDN_SVC["CDN\n(Static Assets, Web App)"]
    end

    subgraph LB["Load Balancer"]
        LB_SVC["Nginx Load Balancer\n(SSL Termination, HTTPS)"]
    end

    subgraph APP_SERVER["Application Servers (Docker / Kubernetes)"]
        GW2["API Gateway\n(Kong)"]
        MS["Microservices Pods\n(Auth, Activity, Proof,\nApplication, AI, Notification...)"]
    end

    subgraph DB_CLUSTER["Database Cluster"]
        PG_M[("PostgreSQL\nPrimary")]
        PG_S[("PostgreSQL\nReplica (Read)")]
        MG[("MongoDB\nReplica Set")]
        RD[("Redis Cluster")]
        FS2["MinIO\nFile Storage"]
    end

    subgraph QUEUE["Message Queue"]
        RMQ["RabbitMQ Cluster"]
    end

    subgraph VNPT_CLOUD["VNPT AI Cloud"]
        VNPT_API["VNPT AI APIs\n(eKYC, vnFace,\nSmartReader, Smartbot...)"]
    end

    USER --> CDN_SVC
    USER --> LB_SVC
    CDN_SVC --> LB_SVC
    LB_SVC --> GW2
    GW2 --> MS
    MS --> PG_M
    MS --> PG_S
    MS --> MG
    MS --> RD
    MS --> FS2
    MS --> RMQ
    RMQ --> MS
    MS --> VNPT_API
```

**Bảng môi trường triển khai:**

| Thành phần | Công nghệ | Ghi chú |
|:---|:---|:---|
| Containerization | Docker + Docker Compose | Development / Staging |
| Orchestration | Kubernetes (K8s) | Production |
| CI/CD | GitHub Actions | Auto build, test, deploy |
| API Gateway | Kong | Auth, Rate Limit, Routing |
| Load Balancer | Nginx | SSL, HTTPS, Static files |
| File Storage | MinIO | Tương thích S3 |
| Message Queue | RabbitMQ | Event-driven notifications |
| Cache | Redis | Session, Token, Cache API |

---

### 5.8. Bảo mật hệ thống

| Lớp | Cơ chế | Mô tả |
|:---|:---|:---|
| **Xác thực** | JWT + Refresh Token | Tất cả API đều yêu cầu Bearer Token |
| **Phân quyền** | RBAC + Unit Scope | Cán bộ chỉ xem dữ liệu trong phạm vi đơn vị mình |
| **Truyền tải** | HTTPS / TLS 1.3 | Mã hóa toàn bộ kênh truyền |
| **Lưu trữ** | Bcrypt (mật khẩu), Mã hóa AES (CCCD) | Bảo vệ dữ liệu nhạy cảm |
| **Kiểm soát** | Audit Log bất biến (MongoDB) | Ghi lại mọi thao tác quan trọng (BR09) |
| **Rate Limiting** | Kong Gateway | Chống tấn công DDoS / Brute Force |
