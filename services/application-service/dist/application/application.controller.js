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
exports.ApplicationController = void 0;
const common_1 = require("@nestjs/common");
const application_service_1 = require("./application.service");
const dto_1 = require("./dto");
const passport_1 = require("@nestjs/passport");
let ApplicationController = class ApplicationController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    getMyApplications(req) {
        return this.appService.getMyApplications(req.user.id);
    }
    getPendingApplications(req) {
        return this.appService.getPendingApplications(req.user);
    }
    getQuyChes() {
        return this.appService.getQuyChes();
    }
    saveQuyChe(dto, req) {
        return this.appService.saveQuyChe(dto, req.user);
    }
    getApplicationById(id, req) {
        return this.appService.getApplicationById(id, req.user);
    }
    create(dto, req) {
        return this.appService.createDraft(req.user.id, dto);
    }
    submitApplication(id, req, body) {
        return this.appService.submitApplication(id, req.user.id, body.minh_chung_ids || []);
    }
    review(id, dto, req) {
        return this.appService.reviewApplication(id, dto, req.user);
    }
    escalateBatch(appIds, req) {
        return this.appService.escalateBatch(appIds, req.user);
    }
};
exports.ApplicationController = ApplicationController;
__decorate([
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "getMyApplications", null);
__decorate([
    (0, common_1.Get)('pending'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "getPendingApplications", null);
__decorate([
    (0, common_1.Get)('quy-ches'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "getQuyChes", null);
__decorate([
    (0, common_1.Post)('quy-ches'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "saveQuyChe", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "getApplicationById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateApplicationDto, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id/submit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "submitApplication", null);
__decorate([
    (0, common_1.Put)(':id/review'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.ReviewApplicationDto, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "review", null);
__decorate([
    (0, common_1.Post)('batch-escalate'),
    __param(0, (0, common_1.Body)('appIds')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "escalateBatch", null);
exports.ApplicationController = ApplicationController = __decorate([
    (0, common_1.Controller)('applications'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [application_service_1.ApplicationService])
], ApplicationController);
//# sourceMappingURL=application.controller.js.map