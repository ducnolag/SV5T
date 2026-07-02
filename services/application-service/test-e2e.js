const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { PrismaClient } = require('shared-database');

const prisma = new PrismaClient();

async function testE2E() {
  try {
    console.log("=== BẮT ĐẦU TEST E2E BẰNG SCRIPT ===");

    // 1. Get Tokens
    const loginSv = await axios.post('http://localhost:3001/auth/login', { email: 'sinhvien1@vnu.edu.vn', mat_khau: 'sv123' });
    const tokenSv = loginSv.data.access_token;
    
    const loginAdmin = await axios.post('http://localhost:3001/auth/login', { email: 'admin@sv5t.vn', mat_khau: 'admin@123' });
    const tokenAdmin = loginAdmin.data.access_token;
    
    console.log("1. Đã lấy token Sinh Viên và Cán Bộ thành công.");

    // 2. Get necessary IDs from DB
    const tieuChi = await prisma.tieu_chi.findFirst();
    const quyChe = await tieuChi ? await prisma.quy_che.findFirst({ where: { id: tieuChi.quy_che_id }}) : null;
    
    if (!tieuChi || !quyChe) {
      console.log("Không tìm thấy tiêu chí hoặc quy chế trong DB!");
      return;
    }
    console.log("2. Đã lấy được tieu_chi_id:", tieuChi.id);

    // 3. Create a dummy file for upload
    fs.writeFileSync('dummy_proof.jpg', 'fake image content');
    
    // 4. Upload Proof
    const form = new FormData();
    form.append('file', fs.createReadStream('dummy_proof.jpg'));
    form.append('tieu_chi_id', tieuChi.id);

    const uploadRes = await axios.post('http://localhost:3005/proofs/upload', form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${tokenSv}`
      }
    });
    
    const minhChungId = uploadRes.data.id;
    console.log("3. Đã upload minh chứng thành công. ID:", minhChungId);

    // Clean up if the student already has an application
    const svData = await prisma.nguoi_dung.findUnique({where:{email:'sinhvien1@vnu.edu.vn'}});
    await prisma.chi_tiet_ho_so.deleteMany({where: {ho_so: {nguoi_dung_id: svData.id}}});
    await prisma.ho_so_sv5t.deleteMany({where: {nguoi_dung_id: svData.id}});

    // 5. Create Draft Application
    const createAppRes = await axios.post('http://localhost:3006/applications', {
      quy_che_id: quyChe.id,
      minh_chung_ids: [minhChungId]
    }, { headers: { Authorization: `Bearer ${tokenSv}` }});
    
    const hoSoId = createAppRes.data.id;
    console.log("4. Đã tạo hồ sơ nháp thành công. ID:", hoSoId, "- Trạng thái:", createAppRes.data.trang_thai);

    // 6. Submit Application
    await axios.put(`http://localhost:3006/applications/${hoSoId}/submit`, {}, {
      headers: { Authorization: `Bearer ${tokenSv}` }
    });
    
    const afterSubmit = await prisma.ho_so_sv5t.findUnique({where: {id: hoSoId}});
    console.log("5. Sinh viên nộp hồ sơ thành công. Trạng thái mới:", afterSubmit.trang_thai);

    // 7. Review Application (Admin/Cán bộ)
    await axios.put(`http://localhost:3006/applications/${hoSoId}/review`, {
      trang_thai: "DAT_TRUONG"
    }, { headers: { Authorization: `Bearer ${tokenAdmin}` }});

    const afterReview = await prisma.ho_so_sv5t.findUnique({where: {id: hoSoId}});
    console.log("6. Cán bộ duyệt hồ sơ thành công. Trạng thái mới:", afterReview.trang_thai, "- Cấp tiếp theo:", afterReview.cap_hien_tai);

    console.log("=== TẤT CẢ CÁC BƯỚC TEST HOÀN TẤT VÀ THÀNH CÔNG! ===");
  } catch (e) {
    console.error("LỖI TEST:", e.response ? e.response.data : e.message);
  } finally {
    await prisma.$disconnect();
  }
}

testE2E();
