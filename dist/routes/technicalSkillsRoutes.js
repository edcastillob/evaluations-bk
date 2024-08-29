"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const technicalSkillsController_1 = require("../controllers/technicalSkillsController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', technicalSkillsController_1.postTechnicalSkills);
exports.default = router;
//# sourceMappingURL=technicalSkillsRoutes.js.map