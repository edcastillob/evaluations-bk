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
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = require("../utils/generateToken");
const user_validator_1 = require("../validators/user-validator");
const custom_exception_1 = require("../exceptions/custom-exception");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    try {
        const validation = (0, user_validator_1.validateUserData)(userData);
        if (validation instanceof Error) {
            const errors = JSON.parse(validation.message);
            throw (0, custom_exception_1.createCustomException)(errors, 400);
        }
        const { email } = userData;
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            throw (0, custom_exception_1.createCustomException)('User already exists', 409);
        }
        if (req.file) {
            const imageFile = req.file;
            const result = yield cloudinary_1.default.uploader.upload(imageFile.path);
            userData.image_url = result.secure_url;
        }
        const user = yield User_1.default.create(userData);
        return res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email }).select('+password');
        if (user && (yield user.matchPassword(password))) {
            return res.json({
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                token: (0, generateToken_1.generateToken)({ _id: user._id, email: user.email, role: user.role })
            });
        }
        else {
            throw (0, custom_exception_1.createCustomException)('Invalid email or password', 401);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=authController.js.map