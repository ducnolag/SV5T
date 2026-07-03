
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.DonViScalarFieldEnum = {
  id: 'id',
  ten_don_vi: 'ten_don_vi',
  cap_do: 'cap_do',
  parent_id: 'parent_id',
  trang_thai: 'trang_thai',
  created_at: 'created_at'
};

exports.Prisma.NguoiDungScalarFieldEnum = {
  id: 'id',
  don_vi_id: 'don_vi_id',
  email: 'email',
  msv: 'msv',
  mat_khau: 'mat_khau',
  ho_ten: 'ho_ten',
  vai_tro: 'vai_tro',
  cccd: 'cccd',
  trang_thai: 'trang_thai',
  so_dien_thoai: 'so_dien_thoai',
  reset_otp: 'reset_otp',
  reset_otp_expires: 'reset_otp_expires',
  created_at: 'created_at'
};

exports.Prisma.QuyCheScalarFieldEnum = {
  id: 'id',
  don_vi_id: 'don_vi_id',
  nam_hoc: 'nam_hoc',
  ngay_mo_cong: 'ngay_mo_cong',
  ngay_dong_cong: 'ngay_dong_cong',
  so_tieu_chi_dat: 'so_tieu_chi_dat',
  created_at: 'created_at'
};

exports.Prisma.TieuChiScalarFieldEnum = {
  id: 'id',
  quy_che_id: 'quy_che_id',
  ten_tieu_chi: 'ten_tieu_chi',
  mo_ta: 'mo_ta',
  thu_tu: 'thu_tu',
  so_luong_yeu_cau: 'so_luong_yeu_cau'
};

exports.Prisma.HoatDongScalarFieldEnum = {
  id: 'id',
  ten_hoat_dong: 'ten_hoat_dong',
  don_vi_tc_id: 'don_vi_tc_id',
  thoi_gian_bat_dau: 'thoi_gian_bat_dau',
  thoi_gian_ket_thuc: 'thoi_gian_ket_thuc',
  dia_diem: 'dia_diem',
  hinh_thuc_dd: 'hinh_thuc_dd',
  trang_thai: 'trang_thai',
  nguoi_duyet_id: 'nguoi_duyet_id',
  ly_do_tu_choi: 'ly_do_tu_choi',
  created_at: 'created_at'
};

exports.Prisma.DiemDanhScalarFieldEnum = {
  id: 'id',
  hoat_dong_id: 'hoat_dong_id',
  nguoi_dung_id: 'nguoi_dung_id',
  phuong_thuc: 'phuong_thuc',
  thoi_gian: 'thoi_gian',
  da_chot: 'da_chot'
};

exports.Prisma.MinhChungScalarFieldEnum = {
  id: 'id',
  nguoi_dung_id: 'nguoi_dung_id',
  tieu_chi_id: 'tieu_chi_id',
  loai: 'loai',
  ten_minh_chung: 'ten_minh_chung',
  file_url: 'file_url',
  trang_thai: 'trang_thai',
  ai_xac_thuc_muc_do: 'ai_xac_thuc_muc_do',
  nguoi_duyet_id: 'nguoi_duyet_id',
  ly_do_loai: 'ly_do_loai',
  created_at: 'created_at'
};

exports.Prisma.HoSoScalarFieldEnum = {
  id: 'id',
  nguoi_dung_id: 'nguoi_dung_id',
  quy_che_id: 'quy_che_id',
  cap_hien_tai: 'cap_hien_tai',
  trang_thai: 'trang_thai',
  ai_flag: 'ai_flag',
  ghi_chu_ai: 'ghi_chu_ai',
  khoa: 'khoa',
  ngay_nop: 'ngay_nop',
  created_at: 'created_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.CapDo = exports.$Enums.CapDo = {
  TW: 'TW',
  TINH: 'TINH',
  TRUONG: 'TRUONG',
  KHOA_CLB: 'KHOA_CLB'
};

exports.VaiTro = exports.$Enums.VaiTro = {
  SINH_VIEN: 'SINH_VIEN',
  CB_TRUONG: 'CB_TRUONG',
  CB_TINH: 'CB_TINH',
  CB_TW: 'CB_TW',
  LCH_CLB: 'LCH_CLB',
  ADMIN: 'ADMIN'
};

exports.TrangThaiTK = exports.$Enums.TrangThaiTK = {
  ACTIVE: 'ACTIVE',
  LOCKED: 'LOCKED'
};

exports.TrangThaiHoSo = exports.$Enums.TrangThaiHoSo = {
  DANG_TAO: 'DANG_TAO',
  DA_NOP: 'DA_NOP',
  CHO_DUYET_TRUONG: 'CHO_DUYET_TRUONG',
  DAT_TRUONG: 'DAT_TRUONG',
  CHO_DUYET_TINH: 'CHO_DUYET_TINH',
  DAT_TINH: 'DAT_TINH',
  CHO_DUYET_TW: 'CHO_DUYET_TW',
  DAT_SV5T: 'DAT_SV5T',
  BI_TU_CHOI: 'BI_TU_CHOI'
};

exports.Prisma.ModelName = {
  DonVi: 'DonVi',
  NguoiDung: 'NguoiDung',
  QuyChe: 'QuyChe',
  TieuChi: 'TieuChi',
  HoatDong: 'HoatDong',
  DiemDanh: 'DiemDanh',
  MinhChung: 'MinhChung',
  HoSo: 'HoSo'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
