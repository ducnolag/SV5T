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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const proof_service_1 = require("./proof.service");
const dto_1 = require("./dto");
const passport_1 = require("@nestjs/passport");
let ProofController = class ProofController {
    proofService;
    constructor(proofService) {
        this.proofService = proofService;
    }
    upload(file, tieuChiId, req) {
        if (!file) {
            throw new common_1.BadRequestException('Vui lòng chọn file minh chứng');
        }
        const tieuChiIdOrNull = tieuChiId && tieuChiId.length > 0 ? tieuChiId : null;
        return this.proofService.uploadProof(req.user.id, tieuChiIdOrNull, file);
    }
    getMyProofs(req) {
        return this.proofService.getMyProofs(req.user.id);
    }
    review(id, dto, req) {
        return this.proofService.reviewProof(id, dto, req.user);
    }
};
exports.ProofController = ProofController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('tieu_chi_id')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ProofController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProofController.prototype, "getMyProofs", null);
__decorate([
    (0, common_1.Put)(':id/review'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.ReviewProofDto, Object]),
    __metadata("design:returntype", void 0)
], ProofController.prototype, "review", null);
exports.ProofController = ProofController = __decorate([
    (0, common_1.Controller)('proofs'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [proof_service_1.ProofService])
], ProofController);
//# sourceMappingURL=proof.controller.js.map