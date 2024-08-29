"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statsController_1 = require("../controllers/statsController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', authMiddleware_1.protect, statsController_1.getStats);
exports.default = router;
//# sourceMappingURL=statsRoutes.js.map