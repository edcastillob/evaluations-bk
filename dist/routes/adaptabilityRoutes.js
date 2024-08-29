"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adaptabilityController_1 = require("../controllers/adaptabilityController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', adaptabilityController_1.postAdaptability);
exports.default = router;
//# sourceMappingURL=adaptabilityRoutes.js.map