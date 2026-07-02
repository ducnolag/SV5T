const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');
  await prisma.chiTietHoSo?.deleteMany().catch(()=>true);
  await prisma.hoSo.deleteMany().catch(()=>true);
  await prisma.minhChung.deleteMany().catch(()=>true);
  await prisma.diemDanh.deleteMany().catch(()=>true);
  await prisma.hoatDongTieuChi?.deleteMany().catch(()=>true);
  await prisma.hoatDong.deleteMany().catch(()=>true);
  await prisma.tieuChi.deleteMany().catch(()=>true);
  await prisma.quyChe.deleteMany().catch(()=>true);
  await prisma.nguoiDung.deleteMany().catch(()=>true);
  await prisma.donVi.deleteMany().catch(()=>true);

  console.log('Seeding Units...');
  
  // Create TW
  const twUnit = await prisma.donVi.create({
    data: { ten_don_vi: 'Trung Ương Hội Sinh viên VN', cap_do: 'TW' }
  });

  // Create Tỉnh
  const hanoiUnit = await prisma.donVi.create({
    data: { ten_don_vi: 'Hội Sinh viên TP Hà Nội', cap_do: 'TINH', parent_id: twUnit.id }
  });

  // Create Trường
  const vnuUnit = await prisma.donVi.create({
    data: { ten_don_vi: 'Hội Sinh viên ĐH Quốc Gia HN', cap_do: 'TRUONG', parent_id: hanoiUnit.id }
  });

  // Create LCH/CLB
  const clbITUnit = await prisma.donVi.create({
    data: { ten_don_vi: 'CLB Tin Học', cap_do: 'KHOA_CLB', parent_id: vnuUnit.id }
  });

  console.log('Seeding Users...');
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash('123456', salt);

  // Admin
  await prisma.nguoiDung.create({
    data: {
      email: 'admin@sv5t.vn',
      ho_ten: 'System Admin',
      mat_khau: password,
      vai_tro: 'ADMIN',
    }
  });

  // Cán bộ TW
  const cbTw = await prisma.nguoiDung.create({
    data: {
      email: 'cbtw@sv5t.vn', ho_ten: 'Cán bộ Trung Ương', mat_khau: password, vai_tro: 'CB_TW', don_vi_id: twUnit.id
    }
  });

  // Cán bộ Tỉnh
  const cbTinh = await prisma.nguoiDung.create({
    data: {
      email: 'cbtinh@sv5t.vn', ho_ten: 'Cán bộ Hà Nội', mat_khau: password, vai_tro: 'CB_TINH', don_vi_id: hanoiUnit.id
    }
  });

  // Cán bộ Trường
  const cbTruong = await prisma.nguoiDung.create({
    data: {
      email: 'cbtruong@vnu.edu.vn', ho_ten: 'Cán bộ VNU', mat_khau: password, vai_tro: 'CB_TRUONG', don_vi_id: vnuUnit.id
    }
  });

  // Cán bộ CLB
  const cbClb = await prisma.nguoiDung.create({
    data: {
      email: 'clbit@vnu.edu.vn', ho_ten: 'Chủ nhiệm CLB IT', mat_khau: password, vai_tro: 'LCH_CLB', don_vi_id: clbITUnit.id
    }
  });

  // Sinh viên
  const sv = await prisma.nguoiDung.create({
    data: {
      email: 'sinhvien1@vnu.edu.vn', msv: '20020001', ho_ten: 'Nguyễn Văn A', mat_khau: password, vai_tro: 'SINH_VIEN', don_vi_id: vnuUnit.id
    }
  });

  console.log('Seeding Rules (Quy chế)...');
  const quyChe = await prisma.quyChe.create({
    data: {
      don_vi_id: vnuUnit.id,
      nam_hoc: '2024-2025',
      ngay_mo_cong: new Date('2024-01-01'),
      ngay_dong_cong: new Date('2024-12-31'),
      so_tieu_chi_dat: 5
    }
  });

  console.log('Seeding Criteria (Tiêu chí)...');
  const criteria = ['Học tập tốt', 'Đạo đức tốt', 'Thể lực tốt', 'Tình nguyện tốt', 'Hội nhập tốt'];
  let tieuChiIds = [];
  for (let i=0; i<criteria.length; i++) {
    const tc = await prisma.tieuChi.create({
      data: { quy_che_id: quyChe.id, ten_tieu_chi: criteria[i], thu_tu: i+1 }
    });
    tieuChiIds.push(tc.id);
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
