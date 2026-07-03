import { PrismaClient, CapDo, VaiTro } from '../generated/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Create Units
  const donViTW = await prisma.donVi.create({
    data: {
      ten_don_vi: 'Trung ương Hội Sinh viên Việt Nam',
      cap_do: CapDo.TW,
    },
  });

  const donViTinh = await prisma.donVi.create({
    data: {
      ten_don_vi: 'Hội Sinh viên Thành phố Hà Nội',
      cap_do: CapDo.TINH,
      parent_id: donViTW.id,
    },
  });

  const donViTruong = await prisma.donVi.create({
    data: {
      ten_don_vi: 'Đại học Quốc gia Hà Nội',
      cap_do: CapDo.TRUONG,
      parent_id: donViTinh.id,
    },
  });

  // 2. Create Quy Che
  const quyChe = await prisma.quyChe.create({
    data: {
      don_vi_id: donViTW.id,
      nam_hoc: '2025-2026',
      ngay_mo_cong: new Date('2026-01-01T00:00:00Z'),
      ngay_dong_cong: new Date('2026-12-31T23:59:59Z'),
      so_tieu_chi_dat: 5,
    },
  });

  // 3. Create Tieu Chi (5 defaults)
  const tieuChis = ['Đạo đức tốt', 'Học tập tốt', 'Thể lực tốt', 'Tình nguyện tốt', 'Hội nhập tốt'];
  for (let i = 0; i < tieuChis.length; i++) {
    await prisma.tieuChi.create({
      data: {
        quy_che_id: quyChe.id,
        ten_tieu_chi: tieuChis[i],
        thu_tu: i + 1,
      },
    });
  }

  // 4. Create Admin User
  const hashedPassword = await bcrypt.hash('admin@123', 10);
  const admin = await prisma.nguoiDung.create({
    data: {
      email: 'admin@sv5t.vn',
      mat_khau: hashedPassword,
      ho_ten: 'System Administrator',
      vai_tro: VaiTro.ADMIN,
      cccd: '001002003004_encrypted_mock', // Mock encrypted for seed
    },
  });

  console.log('Seeding finished.');
  console.log(`Admin account created. Email: admin@sv5t.vn | Password: admin@123`);
  console.log(`Please change password upon first login.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
