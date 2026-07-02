const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const qc = await prisma.quyChe.findMany({
    include: { tieu_chis: true }
  });
  console.dir(qc, { depth: null });
  
  const app = await prisma.hoSo.findMany({
    include: { minh_chungs: true }
  });
  console.dir(app, { depth: null });
}
main().catch(console.error).finally(() => prisma.$disconnect());
