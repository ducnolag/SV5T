const { PrismaClient } = require('shared-database');
const prisma = new PrismaClient();
async function run() {
  const qc = await prisma.quyChe.findMany({
    include: { tieu_chis: true, don_vi: true },
    orderBy: { created_at: 'desc' },
  });
  console.dir(qc, { depth: null });
}
run().catch(console.error).finally(() => prisma.$disconnect());
