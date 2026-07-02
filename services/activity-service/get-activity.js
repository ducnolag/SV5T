const { PrismaClient } = require('shared-database');
const prisma = new PrismaClient();

async function getActivity() {
  try {
    const activity = await prisma.hoat_dong.findFirst({
      orderBy: { thoi_gian_bat_dau: 'desc' },
      select: { id: true, ten_hoat_dong: true }
    });
    console.log("Activity:", activity);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
getActivity();
