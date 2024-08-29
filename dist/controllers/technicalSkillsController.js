"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTechnicalSkills = void 0;
const custom_exception_1 = require("../exceptions/custom-exception");
const data_validator_1 = require("../validators/data-validator");
const IdTechnicalSkills_1 = __importDefault(require("../models/IdTechnicalSkills"));
const postTechnicalSkills = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const technicalSkillsData = req.body;
    try {
        const validation = (0, data_validator_1.validateData)(technicalSkillsData);
        if (validation instanceof Error) {
            const errors = JSON.parse(validation.message);
            throw (0, custom_exception_1.createCustomException)(errors, 400);
        }
        const technicalSkills = yield IdTechnicalSkills_1.default.create(technicalSkillsData);
        return res.status(201).json(technicalSkills);
    }
    catch (error) {
        next(error);
    }
});
exports.postTechnicalSkills = postTechnicalSkills;
//# sourceMappingURL=technicalSkillsController.js.map