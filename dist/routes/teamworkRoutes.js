"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const teamworkController_1 = require("../controllers/teamworkController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', teamworkController_1.postTeamwork);
exports.default = router;
//# sourceMappingURL=teamworkRoutes.js.map