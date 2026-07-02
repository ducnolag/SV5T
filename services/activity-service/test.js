const { PrismaClient } = require('shared-database');
const prisma = new PrismaClient();

async function test() {
  try {
    const res = await prisma.hoat_dong.create({
      data: {
        don_vi_tc_id: "23159dfb-8244-407e-ac4c-b25f4e24e252",
        ten_hoat_dong: "Mùa hè xanh 2024",
        hinh_thuc_dd: "EXCEL",
        thoi_gian_bat_dau: new Date("2024-06-01T00:00:00Z"),
        thoi_gian_ket_thuc: new Date("2024-06-15T00:00:00Z"),
        trang_thai: "CHO_DUYET",
        hoat_dong_tieu_chis: {
          create: {
            tieu_chi_id: "a499df80-68bb-4cdb-b792-3fa6bba16bbe"
          }
        }
      }
    });
    console.log("Success", res);
  } catch (e) {
    console.error("Error", e);
  }
}
test();
