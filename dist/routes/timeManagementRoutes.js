"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const timeManagemenController_1 = require("../controllers/timeManagemenController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', timeManagemenController_1.postTimeManagement);
exports.default = router;
//# sourceMappingURL=timeManagementRoutes.js.map