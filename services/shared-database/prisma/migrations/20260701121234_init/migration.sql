-- CreateEnum
CREATE TYPE "CapDoDonVi" AS ENUM ('TW', 'TINH', 'TRUONG', 'KHOA_CLB');

-- CreateEnum
CREATE TYPE "TrangThaiDonVi" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "VaiTro" AS ENUM ('SINH_VIEN', 'CB_TRUONG', 'CB_TINH', 'CB_TW', 'ADMIN');

-- CreateEnum
CREATE TYPE "TrangThaiNguoiDung" AS ENUM ('ACTIVE', 'LOCKED');

-- CreateEnum
CREATE TYPE "HinhThucDiemDanh" AS ENUM ('CAMERA', 'EXCEL', 'KET_HOP');

-- CreateEnum
CREATE TYPE "TrangThaiHoatDong" AS ENUM ('CHO_DUYET', 'DA_DUYET', 'TU_CHOI', 'DA_CHOT');

-- CreateEnum
CREATE TYPE "PhuongThucDiemDanh" AS ENUM ('CAMERA_VNFACE', 'UPLOAD_EXCEL');

-- CreateEnum
CREATE TYPE "LoaiMinhChung" AS ENUM ('NOI_BO', 'BEN_NGOAI');

-- CreateEnum
CREATE TYPE "TrangThaiMinhChung" AS ENUM ('DANG_XL', 'DA_XAC_THUC', 'CAN_KIEM_TRA', 'DA_DUYET', 'BI_LOAI');

-- CreateEnum
CREATE TYPE "CapHienTai" AS ENUM ('TRUONG', 'TINH', 'TW');

-- CreateEnum
CREATE TYPE "TrangThaiHoSo" AS ENUM ('DANG_TAO', 'DA_NOP', 'CHO_DUYET_TRUONG', 'DAT_TRUONG', 'CHO_DUYET_TINH', 'DAT_TINH', 'CHO_DUYET_TW', 'DAT_SV5T', 'BI_TU_CHOI');

-- CreateEnum
CREATE TYPE "AIFlag" AS ENUM ('XANH', 'VANG', 'DO');

-- CreateTable
CREATE TABLE "don_vi" (
    "id" TEXT NOT NULL,
    "ten_don_vi" TEXT NOT NULL,
    "cap_do" "CapDoDonVi" NOT NULL,
    "parent_id" TEXT,
    "trang_thai" "TrangThaiDonVi" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "don_vi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nguoi_dung" (
    "id" TEXT NOT NULL,
    "don_vi_id" TEXT,
    "email" TEXT NOT NULL,
    "msv" TEXT,
    "mat_khau" TEXT NOT NULL,
    "ho_ten" TEXT NOT NULL,
    "vai_tro" "VaiTro" NOT NULL,
    "cccd" TEXT NOT NULL,
    "trang_thai" "TrangThaiNguoiDung" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "nguoi_dung_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quy_che" (
    "id" TEXT NOT NULL,
    "don_vi_id" TEXT NOT NULL,
    "nam_hoc" TEXT NOT NULL,
    "ngay_mo_cong" TIMESTAMP(3) NOT NULL,
    "ngay_dong_cong" TIMESTAMP(3) NOT NULL,
    "so_tieu_chi_dat" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "quy_che_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tieu_chi" (
    "id" TEXT NOT NULL,
    "quy_che_id" TEXT NOT NULL,
    "ten_tieu_chi" TEXT NOT NULL,
    "mo_ta" TEXT,
    "thu_tu" INTEGER NOT NULL,

    CONSTRAINT "tieu_chi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hoat_dong" (
    "id" TEXT NOT NULL,
    "ten_hoat_dong" TEXT NOT NULL,
    "don_vi_tc_id" TEXT NOT NULL,
    "thoi_gian_bat_dau" TIMESTAMP(3) NOT NULL,
    "thoi_gian_ket_thuc" TIMESTAMP(3) NOT NULL,
    "dia_diem" TEXT,
    "hinh_thuc_dd" "HinhThucDiemDanh" NOT NULL,
    "trang_thai" "TrangThaiHoatDong" NOT NULL DEFAULT 'CHO_DUYET',
    "nguoi_duyet_id" TEXT,
    "ly_do_tu_choi" TEXT,

    CONSTRAINT "hoat_dong_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hoat_dong_tieu_chi" (
    "hoat_dong_id" TEXT NOT NULL,
    "tieu_chi_id" TEXT NOT NULL,

    CONSTRAINT "hoat_dong_tieu_chi_pkey" PRIMARY KEY ("hoat_dong_id","tieu_chi_id")
);

-- CreateTable
CREATE TABLE "diem_danh" (
    "id" TEXT NOT NULL,
    "hoat_dong_id" TEXT NOT NULL,
    "nguoi_dung_id" TEXT NOT NULL,
    "phuong_thuc" "PhuongThucDiemDanh" NOT NULL,
    "thoi_gian" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "da_chot" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "diem_danh_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "minh_chung" (
    "id" TEXT NOT NULL,
    "nguoi_dung_id" TEXT NOT NULL,
    "tieu_chi_id" TEXT NOT NULL,
    "loai" "LoaiMinhChung" NOT NULL,
    "file_url" TEXT,
    "trang_thai" "TrangThaiMinhChung" NOT NULL DEFAULT 'DANG_XL',
    "nguoi_duyet_id" TEXT,
    "ly_do_loai" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "minh_chung_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ho_so_sv5t" (
    "id" TEXT NOT NULL,
    "nguoi_dung_id" TEXT NOT NULL,
    "quy_che_id" TEXT NOT NULL,
    "cap_hien_tai" "CapHienTai" NOT NULL DEFAULT 'TRUONG',
    "trang_thai" "TrangThaiHoSo" NOT NULL DEFAULT 'DANG_TAO',
    "ai_flag" "AIFlag",
    "ghi_chu_ai" TEXT,
    "khoa" BOOLEAN NOT NULL DEFAULT false,
    "ngay_nop" TIMESTAMP(3),

    CONSTRAINT "ho_so_sv5t_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chi_tiet_ho_so" (
    "ho_so_id" TEXT NOT NULL,
    "minh_chung_id" TEXT NOT NULL,

    CONSTRAINT "chi_tiet_ho_so_pkey" PRIMARY KEY ("ho_so_id","minh_chung_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nguoi_dung_email_key" ON "nguoi_dung"("email");

-- CreateIndex
CREATE UNIQUE INDEX "nguoi_dung_msv_key" ON "nguoi_dung"("msv");

-- CreateIndex
CREATE UNIQUE INDEX "nguoi_dung_cccd_key" ON "nguoi_dung"("cccd");

-- CreateIndex
CREATE UNIQUE INDEX "quy_che_don_vi_id_nam_hoc_key" ON "quy_che"("don_vi_id", "nam_hoc");

-- CreateIndex
CREATE UNIQUE INDEX "diem_danh_hoat_dong_id_nguoi_dung_id_key" ON "diem_danh"("hoat_dong_id", "nguoi_dung_id");

-- CreateIndex
CREATE UNIQUE INDEX "ho_so_sv5t_nguoi_dung_id_quy_che_id_key" ON "ho_so_sv5t"("nguoi_dung_id", "quy_che_id");

-- AddForeignKey
ALTER TABLE "don_vi" ADD CONSTRAINT "don_vi_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "don_vi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nguoi_dung" ADD CONSTRAINT "nguoi_dung_don_vi_id_fkey" FOREIGN KEY ("don_vi_id") REFERENCES "don_vi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quy_che" ADD CONSTRAINT "quy_che_don_vi_id_fkey" FOREIGN KEY ("don_vi_id") REFERENCES "don_vi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tieu_chi" ADD CONSTRAINT "tieu_chi_quy_che_id_fkey" FOREIGN KEY ("quy_che_id") REFERENCES "quy_che"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hoat_dong" ADD CONSTRAINT "hoat_dong_don_vi_tc_id_fkey" FOREIGN KEY ("don_vi_tc_id") REFERENCES "don_vi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hoat_dong" ADD CONSTRAINT "hoat_dong_nguoi_duyet_id_fkey" FOREIGN KEY ("nguoi_duyet_id") REFERENCES "nguoi_dung"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hoat_dong_tieu_chi" ADD CONSTRAINT "hoat_dong_tieu_chi_hoat_dong_id_fkey" FOREIGN KEY ("hoat_dong_id") REFERENCES "hoat_dong"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hoat_dong_tieu_chi" ADD CONSTRAINT "hoat_dong_tieu_chi_tieu_chi_id_fkey" FOREIGN KEY ("tieu_chi_id") REFERENCES "tieu_chi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diem_danh" ADD CONSTRAINT "diem_danh_hoat_dong_id_fkey" FOREIGN KEY ("hoat_dong_id") REFERENCES "hoat_dong"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diem_danh" ADD CONSTRAINT "diem_danh_nguoi_dung_id_fkey" FOREIGN KEY ("nguoi_dung_id") REFERENCES "nguoi_dung"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "minh_chung" ADD CONSTRAINT "minh_chung_nguoi_dung_id_fkey" FOREIGN KEY ("nguoi_dung_id") REFERENCES "nguoi_dung"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "minh_chung" ADD CONSTRAINT "minh_chung_tieu_chi_id_fkey" FOREIGN KEY ("tieu_chi_id") REFERENCES "tieu_chi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "minh_chung" ADD CONSTRAINT "minh_chung_nguoi_duyet_id_fkey" FOREIGN KEY ("nguoi_duyet_id") REFERENCES "nguoi_dung"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ho_so_sv5t" ADD CONSTRAINT "ho_so_sv5t_nguoi_dung_id_fkey" FOREIGN KEY ("nguoi_dung_id") REFERENCES "nguoi_dung"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ho_so_sv5t" ADD CONSTRAINT "ho_so_sv5t_quy_che_id_fkey" FOREIGN KEY ("quy_che_id") REFERENCES "quy_che"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chi_tiet_ho_so" ADD CONSTRAINT "chi_tiet_ho_so_ho_so_id_fkey" FOREIGN KEY ("ho_so_id") REFERENCES "ho_so_sv5t"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chi_tiet_ho_so" ADD CONSTRAINT "chi_tiet_ho_so_minh_chung_id_fkey" FOREIGN KEY ("minh_chung_id") REFERENCES "minh_chung"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
