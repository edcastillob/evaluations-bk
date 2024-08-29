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
exports.deleteFeedback = exports.postFeedback = void 0;
const custom_exception_1 = require("../exceptions/custom-exception");
const Feedback_1 = __importDefault(require("../models/Feedback"));
const feedback_validator_1 = require("../validators/feedback-validator");
const valid_object_id_1 = require("../utils/valid-object-id");
const postFeedback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const feedbackData = req.body;
    try {
        const validation = (0, feedback_validator_1.validateFeedbackData)(feedbackData);
        if (validation instanceof Error) {
            const errors = JSON.parse(validation.message);
            throw (0, custom_exception_1.createCustomException)(errors, 400);
        }
        const feedback = yield Feedback_1.default.create(feedbackData);
        return res.status(201).json(feedback);
    }
    catch (error) {
        next(error);
    }
});
exports.postFeedback = postFeedback;
const deleteFeedback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { feedbackId } = req.params;
    try {
        (0, valid_object_id_1.isValidObjectId)(feedbackId);
        const evaluation = yield Feedback_1.default.findById(feedbackId);
        if (!evaluation) {
            throw (0, custom_exception_1.createCustomException)('Feedback not found', 404);
        }
        yield Feedback_1.default.findByIdAndDelete(feedbackId);
        return res.status(200).send('Feedback successfully deleted');
    }
    catch (error) {
        next(error);
    }
});
exports.deleteFeedback = deleteFeedback;
//# sourceMappingURL=feedbackController.js.map