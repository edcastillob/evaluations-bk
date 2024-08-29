"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("../middlewares/multer");
const authController_1 = require("../controllers/authController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/register', multer_1.multerUpload.single('image'), authController_1.registerUser);
router.post('/login', authController_1.loginUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map