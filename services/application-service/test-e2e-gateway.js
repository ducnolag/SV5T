const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { PrismaClient } = require('shared-database');
const io = require('socket.io-client');

const prisma = new PrismaClient();
const GATEWAY_URL = 'http://localhost:3000/api';
const SOCKET_URL = 'http://localhost:3000';

async function testE2EGateway() {
  try {
    console.log("=== BẮT ĐẦU TEST E2E QUA GATEWAY (PORT 3000) ===");

    // 1. Get Tokens via Gateway
    const loginSv = await axios.post(`${GATEWAY_URL}/auth/login`, { email: 'sinhvien1@vnu.edu.vn', mat_khau: 'sv123' });
    const tokenSv = loginSv.data.access_token;
    
    const loginAdmin = await axios.post(`${GATEWAY_URL}/auth/login`, { email: 'admin@sv5t.vn', mat_khau: 'admin@123' });
    const tokenAdmin = loginAdmin.data.access_token;
    
    console.log("1. Đã đăng nhập qua Gateway lấy token thành công.");

    // Connect Socket
    const socket = io(SOCKET_URL, {
      extraHeaders: {
        Authorization: `Bearer ${tokenSv}`
      }
    });

    socket.on('connect', () => {
      console.log('-> Socket.io đã kết nối thành công qua Gateway!');
    });

    socket.on('notification', (msg) => {
      console.log('-> [REAL-TIME NOTIFICATION NHẬN TỪ SOCKET]:', msg);
      setTimeout(() => process.exit(0), 1000);
    });

    // 2. Upload Proof via Gateway
    const tieuChi = await prisma.tieu_chi.findFirst();
    const quyChe = await prisma.quy_che.findFirst({ where: { id: tieuChi.quy_che_id }});
    
    fs.writeFileSync('dummy_proof2.jpg', 'fake image content');
    const form = new FormData();
    form.append('file', fs.createReadStream('dummy_proof2.jpg'));
    form.append('tieu_chi_id', tieuChi.id);

    const uploadRes = await axios.post(`${GATEWAY_URL}/proofs/upload`, form, {
      headers: { ...form.getHeaders(), Authorization: `Bearer ${tokenSv}` }
    });
    
    const minhChungId = uploadRes.data.id;
    console.log("2. Upload minh chứng qua Gateway thành công. ID:", minhChungId);

    // Clean up if the student already has an application
    const svData = await prisma.nguoi_dung.findUnique({where:{email:'sinhvien1@vnu.edu.vn'}});
    await prisma.chi_tiet_ho_so.deleteMany({where: {ho_so: {nguoi_dung_id: svData.id}}});
    await prisma.ho_so_sv5t.deleteMany({where: {nguoi_dung_id: svData.id}});

    // 3. Create Draft Application via Gateway
    const createAppRes = await axios.post(`${GATEWAY_URL}/applications`, {
      quy_che_id: quyChe.id,
      minh_chung_ids: [minhChungId]
    }, { headers: { Authorization: `Bearer ${tokenSv}` }});
    const hoSoId = createAppRes.data.id;
    console.log("3. Tạo hồ sơ qua Gateway thành công.");

    // 4. Submit Application via Gateway
    await axios.put(`${GATEWAY_URL}/applications/${hoSoId}/submit`, {}, {
      headers: { Authorization: `Bearer ${tokenSv}` }
    });
    console.log("4. Nộp hồ sơ qua Gateway thành công.");

    // 5. Review Application (Admin) via Gateway -> This triggers the socket notification!
    console.log("5. Cán bộ đang duyệt hồ sơ, chờ thông báo qua Socket...");
    await axios.put(`${GATEWAY_URL}/applications/${hoSoId}/review`, {
      trang_thai: "DAT_TRUONG"
    }, { headers: { Authorization: `Bearer ${tokenAdmin}` }});

  } catch (e) {
    console.error("LỖI TEST:", e.response ? e.response.data : e.message);
    process.exit(1);
  }
}

// Wait a bit for notification service to be ready
setTimeout(testE2EGateway, 3000);
