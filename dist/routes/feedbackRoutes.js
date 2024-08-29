"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feedbackController_1 = require("../controllers/feedbackController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', feedbackController_1.postFeedback);
router.delete('/:feedbackId', feedbackController_1.deleteFeedback);
exports.default = router;
//# sourceMappingURL=feedbackRoutes.js.map