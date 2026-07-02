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
exports.RuleController = void 0;
const common_1 = require("@nestjs/common");
const rule_service_1 = require("./rule.service");
const dto_1 = require("./dto");
const passport_1 = require("@nestjs/passport");
let RuleController = class RuleController {
    ruleService;
    constructor(ruleService) {
        this.ruleService = ruleService;
    }
    getAll() {
        return this.ruleService.getAllRules();
    }
    create(dto, req) {
        return this.ruleService.createRule(dto, req.user);
    }
    updateTimeWindow(id, dto, req) {
        return this.ruleService.updateTimeWindow(id, dto, req.user);
    }
};
exports.RuleController = RuleController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RuleController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateRuleDto, Object]),
    __metadata("design:returntype", void 0)
], RuleController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id/time-window'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateTimeWindowDto, Object]),
    __metadata("design:returntype", void 0)
], RuleController.prototype, "updateTimeWindow", null);
exports.RuleController = RuleController = __decorate([
    (0, common_1.Controller)('rules'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [rule_service_1.RuleService])
], RuleController);
//# sourceMappingURL=rule.controller.js.map