
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/library.js')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

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




  const path = require('path')

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
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\hackathon\\services\\shared-database\\generated\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      },
      {
        "fromEnvVar": null,
        "value": "linux-musl"
      },
      {
        "fromEnvVar": null,
        "value": "linux-musl-openssl-3.0.x"
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "D:\\hackathon\\services\\shared-database\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "../../prisma",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider      = \"prisma-client-js\"\n  output        = \"../generated/client\"\n  binaryTargets = [\"native\", \"linux-musl\", \"linux-musl-openssl-3.0.x\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel DonVi {\n  id         String   @id @default(uuid()) @db.Uuid\n  ten_don_vi String   @db.VarChar(255)\n  cap_do     CapDo // TW, TINH, TRUONG, KHOA_CLB\n  parent_id  String?  @db.Uuid\n  trang_thai Boolean  @default(true)\n  created_at DateTime @default(now())\n\n  parent   DonVi?  @relation(\"DonViHierarchy\", fields: [parent_id], references: [id])\n  children DonVi[] @relation(\"DonViHierarchy\")\n\n  nguoi_dungs NguoiDung[]\n  quy_ches    QuyChe[]\n  hoat_dongs  HoatDong[]\n}\n\nenum CapDo {\n  TW\n  TINH\n  TRUONG\n  KHOA_CLB\n}\n\nmodel NguoiDung {\n  id                String      @id @default(uuid()) @db.Uuid\n  don_vi_id         String?     @db.Uuid\n  email             String      @unique @db.VarChar(255)\n  msv               String?     @unique @db.VarChar(50)\n  mat_khau          String      @db.VarChar(255)\n  ho_ten            String      @db.VarChar(255)\n  vai_tro           VaiTro      @default(SINH_VIEN)\n  cccd              String?     @unique @db.VarChar(255)\n  trang_thai        TrangThaiTK @default(ACTIVE)\n  so_dien_thoai     String?     @db.VarChar(20)\n  reset_otp         String?     @db.VarChar(10)\n  reset_otp_expires DateTime?\n  created_at        DateTime    @default(now())\n\n  don_vi DonVi? @relation(fields: [don_vi_id], references: [id])\n\n  diem_danhs       DiemDanh[]\n  minh_chungs      MinhChung[]\n  ho_sos           HoSo[]\n  hoat_dong_duyets HoatDong[]  @relation(\"NguoiDuyetHD\")\n}\n\nenum VaiTro {\n  SINH_VIEN\n  CB_TRUONG\n  CB_TINH\n  CB_TW\n  LCH_CLB\n  ADMIN\n}\n\nenum TrangThaiTK {\n  ACTIVE\n  LOCKED\n}\n\nmodel QuyChe {\n  id              String   @id @default(uuid()) @db.Uuid\n  don_vi_id       String   @db.Uuid\n  nam_hoc         String   @db.VarChar(20)\n  ngay_mo_cong    DateTime\n  ngay_dong_cong  DateTime\n  so_tieu_chi_dat Int      @default(5)\n  created_at      DateTime @default(now())\n\n  don_vi    DonVi     @relation(fields: [don_vi_id], references: [id])\n  tieu_chis TieuChi[]\n  ho_sos    HoSo[]\n\n  @@unique([don_vi_id, nam_hoc])\n}\n\nmodel TieuChi {\n  id               String  @id @default(uuid()) @db.Uuid\n  quy_che_id       String  @db.Uuid\n  ten_tieu_chi     String  @db.VarChar(255)\n  mo_ta            String? @db.Text\n  thu_tu           Int?\n  so_luong_yeu_cau Int     @default(1)\n\n  quy_che     QuyChe      @relation(fields: [quy_che_id], references: [id])\n  hoat_dongs  HoatDong[]\n  minh_chungs MinhChung[]\n}\n\nmodel HoatDong {\n  id                 String   @id @default(uuid()) @db.Uuid\n  ten_hoat_dong      String   @db.VarChar(255)\n  don_vi_tc_id       String   @db.Uuid\n  thoi_gian_bat_dau  DateTime\n  thoi_gian_ket_thuc DateTime\n  dia_diem           String?  @db.VarChar(255)\n  hinh_thuc_dd       String   @db.VarChar(20) // CAMERA, EXCEL, KET_HOP\n  trang_thai         String   @db.VarChar(30) // CHO_DUYET, DA_DUYET, TU_CHOI\n  nguoi_duyet_id     String?  @db.Uuid\n  ly_do_tu_choi      String?  @db.Text\n  created_at         DateTime @default(now())\n\n  don_vi_tc   DonVi      @relation(fields: [don_vi_tc_id], references: [id])\n  nguoi_duyet NguoiDung? @relation(\"NguoiDuyetHD\", fields: [nguoi_duyet_id], references: [id])\n  tieu_chis   TieuChi[]\n  diem_danhs  DiemDanh[]\n}\n\nmodel DiemDanh {\n  id            String   @id @default(uuid()) @db.Uuid\n  hoat_dong_id  String   @db.Uuid\n  nguoi_dung_id String   @db.Uuid\n  phuong_thuc   String   @db.VarChar(20)\n  thoi_gian     DateTime @default(now())\n  da_chot       Boolean  @default(false)\n\n  hoat_dong  HoatDong  @relation(fields: [hoat_dong_id], references: [id])\n  nguoi_dung NguoiDung @relation(fields: [nguoi_dung_id], references: [id])\n\n  @@unique([hoat_dong_id, nguoi_dung_id])\n}\n\nmodel MinhChung {\n  id                 String   @id @default(uuid()) @db.Uuid\n  nguoi_dung_id      String   @db.Uuid\n  tieu_chi_id        String?  @db.Uuid\n  loai               String   @db.VarChar(20) // NOI_BO, BEN_NGOAI\n  ten_minh_chung     String?  @db.VarChar(255)\n  file_url           String   @db.Text\n  trang_thai         String   @db.VarChar(30) // DANG_XL, DA_XAC_THUC, CAN_KIEM_TRA, DA_DUYET, BI_LOAI\n  ai_xac_thuc_muc_do Int? // Confidence score\n  nguoi_duyet_id     String?  @db.Uuid\n  ly_do_loai         String?  @db.Text\n  created_at         DateTime @default(now())\n\n  nguoi_dung NguoiDung @relation(fields: [nguoi_dung_id], references: [id])\n  tieu_chi   TieuChi?  @relation(fields: [tieu_chi_id], references: [id])\n  ho_sos     HoSo[]\n}\n\nmodel HoSo {\n  id            String        @id @default(uuid()) @db.Uuid\n  nguoi_dung_id String        @db.Uuid\n  quy_che_id    String        @db.Uuid\n  cap_hien_tai  String        @default(\"TRUONG\") @db.VarChar(20)\n  trang_thai    TrangThaiHoSo @default(DANG_TAO)\n  ai_flag       String?       @db.VarChar(10) // XANH, VANG, DO\n  ghi_chu_ai    String?       @db.Text\n  khoa          Boolean       @default(false)\n  ngay_nop      DateTime?\n  created_at    DateTime      @default(now())\n\n  nguoi_dung  NguoiDung   @relation(fields: [nguoi_dung_id], references: [id])\n  quy_che     QuyChe      @relation(fields: [quy_che_id], references: [id])\n  minh_chungs MinhChung[]\n\n  @@unique([nguoi_dung_id, quy_che_id])\n}\n\nenum TrangThaiHoSo {\n  DANG_TAO\n  DA_NOP\n  CHO_DUYET_TRUONG\n  DAT_TRUONG\n  CHO_DUYET_TINH\n  DAT_TINH\n  CHO_DUYET_TW\n  DAT_SV5T\n  BI_TU_CHOI\n}\n",
  "inlineSchemaHash": "b13e5ff9e484d382cce62360de1759593ceadc6e5de1740337b457fb25ceb143",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "generated/client",
    "client",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"DonVi\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ten_don_vi\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cap_do\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CapDo\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parent_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trang_thai\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parent\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DonVi\",\"relationName\":\"DonViHierarchy\",\"relationFromFields\":[\"parent_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"children\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DonVi\",\"relationName\":\"DonViHierarchy\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nguoi_dungs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"NguoiDung\",\"relationName\":\"DonViToNguoiDung\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quy_ches\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"QuyChe\",\"relationName\":\"DonViToQuyChe\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hoat_dongs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"HoatDong\",\"relationName\":\"DonViToHoatDong\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"NguoiDung\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"don_vi_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"msv\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mat_khau\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ho_ten\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vai_tro\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"VaiTro\",\"default\":\"SINH_VIEN\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cccd\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trang_thai\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"TrangThaiTK\",\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"so_dien_thoai\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reset_otp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reset_otp_expires\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"don_vi\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DonVi\",\"relationName\":\"DonViToNguoiDung\",\"relationFromFields\":[\"don_vi_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"diem_danhs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DiemDanh\",\"relationName\":\"DiemDanhToNguoiDung\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"minh_chungs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MinhChung\",\"relationName\":\"MinhChungToNguoiDung\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ho_sos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"HoSo\",\"relationName\":\"HoSoToNguoiDung\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hoat_dong_duyets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"HoatDong\",\"relationName\":\"NguoiDuyetHD\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"QuyChe\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"don_vi_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nam_hoc\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ngay_mo_cong\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ngay_dong_cong\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"so_tieu_chi_dat\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":5,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"don_vi\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DonVi\",\"relationName\":\"DonViToQuyChe\",\"relationFromFields\":[\"don_vi_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tieu_chis\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TieuChi\",\"relationName\":\"QuyCheToTieuChi\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ho_sos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"HoSo\",\"relationName\":\"HoSoToQuyChe\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"don_vi_id\",\"nam_hoc\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"don_vi_id\",\"nam_hoc\"]}],\"isGenerated\":false},\"TieuChi\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quy_che_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ten_tieu_chi\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mo_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"thu_tu\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"so_luong_yeu_cau\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quy_che\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"QuyChe\",\"relationName\":\"QuyCheToTieuChi\",\"relationFromFields\":[\"quy_che_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hoat_dongs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"HoatDong\",\"relationName\":\"HoatDongToTieuChi\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"minh_chungs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MinhChung\",\"relationName\":\"MinhChungToTieuChi\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"HoatDong\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ten_hoat_dong\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"don_vi_tc_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"thoi_gian_bat_dau\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"thoi_gian_ket_thuc\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dia_diem\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hinh_thuc_dd\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trang_thai\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nguoi_duyet_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ly_do_tu_choi\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"don_vi_tc\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DonVi\",\"relationName\":\"DonViToHoatDong\",\"relationFromFields\":[\"don_vi_tc_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nguoi_duyet\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"NguoiDung\",\"relationName\":\"NguoiDuyetHD\",\"relationFromFields\":[\"nguoi_duyet_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tieu_chis\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TieuChi\",\"relationName\":\"HoatDongToTieuChi\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"diem_danhs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DiemDanh\",\"relationName\":\"DiemDanhToHoatDong\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"DiemDanh\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hoat_dong_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nguoi_dung_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phuong_thuc\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"thoi_gian\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"da_chot\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hoat_dong\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"HoatDong\",\"relationName\":\"DiemDanhToHoatDong\",\"relationFromFields\":[\"hoat_dong_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nguoi_dung\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"NguoiDung\",\"relationName\":\"DiemDanhToNguoiDung\",\"relationFromFields\":[\"nguoi_dung_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"hoat_dong_id\",\"nguoi_dung_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"hoat_dong_id\",\"nguoi_dung_id\"]}],\"isGenerated\":false},\"MinhChung\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nguoi_dung_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tieu_chi_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"loai\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ten_minh_chung\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"file_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trang_thai\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ai_xac_thuc_muc_do\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nguoi_duyet_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ly_do_loai\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nguoi_dung\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"NguoiDung\",\"relationName\":\"MinhChungToNguoiDung\",\"relationFromFields\":[\"nguoi_dung_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tieu_chi\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TieuChi\",\"relationName\":\"MinhChungToTieuChi\",\"relationFromFields\":[\"tieu_chi_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ho_sos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"HoSo\",\"relationName\":\"HoSoToMinhChung\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"HoSo\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nguoi_dung_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quy_che_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cap_hien_tai\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"TRUONG\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trang_thai\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"TrangThaiHoSo\",\"default\":\"DANG_TAO\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ai_flag\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ghi_chu_ai\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"khoa\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ngay_nop\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nguoi_dung\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"NguoiDung\",\"relationName\":\"HoSoToNguoiDung\",\"relationFromFields\":[\"nguoi_dung_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quy_che\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"QuyChe\",\"relationName\":\"HoSoToQuyChe\",\"relationFromFields\":[\"quy_che_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"minh_chungs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MinhChung\",\"relationName\":\"HoSoToMinhChung\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"nguoi_dung_id\",\"quy_che_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"nguoi_dung_id\",\"quy_che_id\"]}],\"isGenerated\":false}},\"enums\":{\"CapDo\":{\"values\":[{\"name\":\"TW\",\"dbName\":null},{\"name\":\"TINH\",\"dbName\":null},{\"name\":\"TRUONG\",\"dbName\":null},{\"name\":\"KHOA_CLB\",\"dbName\":null}],\"dbName\":null},\"VaiTro\":{\"values\":[{\"name\":\"SINH_VIEN\",\"dbName\":null},{\"name\":\"CB_TRUONG\",\"dbName\":null},{\"name\":\"CB_TINH\",\"dbName\":null},{\"name\":\"CB_TW\",\"dbName\":null},{\"name\":\"LCH_CLB\",\"dbName\":null},{\"name\":\"ADMIN\",\"dbName\":null}],\"dbName\":null},\"TrangThaiTK\":{\"values\":[{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"LOCKED\",\"dbName\":null}],\"dbName\":null},\"TrangThaiHoSo\":{\"values\":[{\"name\":\"DANG_TAO\",\"dbName\":null},{\"name\":\"DA_NOP\",\"dbName\":null},{\"name\":\"CHO_DUYET_TRUONG\",\"dbName\":null},{\"name\":\"DAT_TRUONG\",\"dbName\":null},{\"name\":\"CHO_DUYET_TINH\",\"dbName\":null},{\"name\":\"DAT_TINH\",\"dbName\":null},{\"name\":\"CHO_DUYET_TW\",\"dbName\":null},{\"name\":\"DAT_SV5T\",\"dbName\":null},{\"name\":\"BI_TU_CHOI\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "query_engine-windows.dll.node");
path.join(process.cwd(), "generated/client/query_engine-windows.dll.node")

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-linux-musl.so.node");
path.join(process.cwd(), "generated/client/libquery_engine-linux-musl.so.node")

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-linux-musl-openssl-3.0.x.so.node");
path.join(process.cwd(), "generated/client/libquery_engine-linux-musl-openssl-3.0.x.so.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "generated/client/schema.prisma")
