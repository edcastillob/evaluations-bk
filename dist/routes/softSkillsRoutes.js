"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const softSkillsController_1 = require("../controllers/softSkillsController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', softSkillsController_1.postsoftSkills);
exports.default = router;
//# sourceMappingURL=softSkillsRoutes.js.map