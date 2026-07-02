const { PrismaClient } = require('shared-database');
const prisma = new PrismaClient();

async function getStudent() {
  try {
    const student = await prisma.nguoi_dung.findFirst({
      where: { vai_tro: 'SINH_VIEN' },
      select: { msv: true, ho_ten: true, email: true }
    });
    console.log("Student:", student);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
getStudent();
