import { PrismaClient, VaiTro } from '../generated/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Tạo tài khoản cán bộ để test...');

  const donViTW = await prisma.donVi.findFirst({ where: { cap_do: 'TW' } });
  const donViTinh = await prisma.donVi.findFirst({ where: { cap_do: 'TINH' } });
  const donViTruong = await prisma.donVi.findFirst({ where: { cap_do: 'TRUONG' } });

  const hashedPassword = await bcrypt.hash('staff@123', 10);

  if (donViTW) {
    await prisma.nguoiDung.upsert({
      where: { email: 'cbtw@sv5t.vn' },
      update: {},
      create: {
        email: 'cbtw@sv5t.vn',
        mat_khau: hashedPassword,
        ho_ten: 'Cán bộ Trung ương',
        vai_tro: VaiTro.CB_TW,
        don_vi_id: donViTW.id,
      }
    });
    console.log('Created: cbtw@sv5t.vn | Pass: staff@123');
  }

  if (donViTinh) {
    await prisma.nguoiDung.upsert({
      where: { email: 'cbtinh@sv5t.vn' },
      update: {},
      create: {
        email: 'cbtinh@sv5t.vn',
        mat_khau: hashedPassword,
        ho_ten: 'Cán bộ Tỉnh/Thành phố',
        vai_tro: VaiTro.CB_TINH,
        don_vi_id: donViTinh.id,
      }
    });
    console.log('Created: cbtinh@sv5t.vn | Pass: staff@123');
  }

  if (donViTruong) {
    await prisma.nguoiDung.upsert({
      where: { email: 'cbtruong@sv5t.vn' },
      update: {},
      create: {
        email: 'cbtruong@sv5t.vn',
        mat_khau: hashedPassword,
        ho_ten: 'Cán bộ Trường',
        vai_tro: VaiTro.CB_TRUONG,
        don_vi_id: donViTruong.id,
      }
    });
    console.log('Created: cbtruong@sv5t.vn | Pass: staff@123');
  }

  console.log('Tạo tài khoản thành công!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
