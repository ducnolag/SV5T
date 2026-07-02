"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApproveActivityDto = exports.CreateActivityDto = void 0;
const class_validator_1 = require("class-validator");
class CreateActivityDto {
    don_vi_tc_id;
    ten_hoat_dong;
    mo_ta;
    tieu_chi_id;
    thoi_gian_bat_dau;
    thoi_gian_ket_thuc;
    hinh_thuc_dd;
}
exports.CreateActivityDto = CreateActivityDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "don_vi_tc_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "ten_hoat_dong", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "mo_ta", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "tieu_chi_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "thoi_gian_bat_dau", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "thoi_gian_ket_thuc", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(['CAMERA_VNFACE', 'UPLOAD_EXCEL', 'CAMERA', 'EXCEL', 'KET_HOP']),
    __metadata("design:type", String)
], CreateActivityDto.prototype, "hinh_thuc_dd", void 0);
class ApproveActivityDto {
    trang_thai;
}
exports.ApproveActivityDto = ApproveActivityDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(['CHO_DUYET', 'DA_DUYET', 'TU_CHOI', 'DA_CHOT']),
    __metadata("design:type", String)
], ApproveActivityDto.prototype, "trang_thai", void 0);
//# sourceMappingURL=dto.js.map