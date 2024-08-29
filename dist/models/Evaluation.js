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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const evaluationSchema = new mongoose_1.Schema({
    id_user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    id_technical_skills: { type: Number, ref: 'IdTechnicalSkills', required: true },
    id_comunication: { type: Number, ref: 'Comunication', required: true },
    id_teamwork: { type: Number, ref: 'Teamwork', required: true },
    id_time_management: { type: Number, ref: 'IdTechnicalSkills', required: true },
    id_adaptability: { type: Number, ref: 'Adaptability', required: true },
    id_soft_skills: { type: Number, ref: 'SoftSkills', required: true },
    id_evaluator: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
});
const Evaluation = mongoose_1.default.model('Evaluation', evaluationSchema);
exports.default = Evaluation;
//# sourceMappingURL=Evaluation.js.map