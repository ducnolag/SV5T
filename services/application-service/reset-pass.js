const { PrismaClient } = require('shared-database');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function reset() {
  const hash = await bcrypt.hash('sv123', 10);
  await prisma.nguoi_dung.update({
    where: { email: 'sinhvien1@vnu.edu.vn' },
    data: { mat_khau: hash }
  });
  console.log("Reset password for sinhvien1@vnu.edu.vn to sv123");
  await prisma.$disconnect();
}
reset();
