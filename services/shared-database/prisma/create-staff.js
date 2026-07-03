"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../generated/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
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
                vai_tro: client_1.VaiTro.CB_TW,
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
                vai_tro: client_1.VaiTro.CB_TINH,
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
                vai_tro: client_1.VaiTro.CB_TRUONG,
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
