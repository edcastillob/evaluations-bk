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
exports.postAdaptability = void 0;
const custom_exception_1 = require("../exceptions/custom-exception");
const data_validator_1 = require("../validators/data-validator");
const Adaptability_1 = __importDefault(require("../models/Adaptability"));
const postAdaptability = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const adaptabilityData = req.body;
    try {
        const validation = (0, data_validator_1.validateData)(adaptabilityData);
        if (validation instanceof Error) {
            const errors = JSON.parse(validation.message);
            throw (0, custom_exception_1.createCustomException)(errors, 400);
        }
        const adaptability = yield Adaptability_1.default.create(adaptabilityData);
        return res.status(201).json(adaptability);
    }
    catch (error) {
        next(error);
    }
});
exports.postAdaptability = postAdaptability;
//# sourceMappingURL=adaptabilityController.js.map