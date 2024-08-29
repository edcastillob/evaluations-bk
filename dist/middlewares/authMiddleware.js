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
exports.employee = exports.manager = exports.admin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const custom_exception_1 = require("../exceptions/custom-exception");
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
            const user = yield User_1.default.findById(decoded.id).select('-password');
            if (!user) {
                return next((0, custom_exception_1.createCustomException)('Not authorized, user not found', 401));
            }
            req.user = user;
            next();
        }
        catch (error) {
            return next((0, custom_exception_1.createCustomException)('Not authorized, token failed', 401));
        }
    }
    else {
        return next((0, custom_exception_1.createCustomException)('Not authorized, no token', 401));
    }
});
exports.protect = protect;
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    }
    else {
        throw (0, custom_exception_1.createCustomException)('Not authorized as admin', 403);
    }
};
exports.admin = admin;
const manager = (req, res, next) => {
    if (req.user && (req.user.role === 'Admin' || req.user.role === 'Manager')) {
        next();
    }
    else {
        throw (0, custom_exception_1.createCustomException)('Not authorized as manager', 403);
    }
};
exports.manager = manager;
const employee = (req, res, next) => {
    if (req.user && (req.user.role === 'Admin' || req.user.role === 'Manager' || req.user.role === 'Employee')) {
        next();
    }
    else {
        throw (0, custom_exception_1.createCustomException)('Not authorized as employee', 403);
    }
};
exports.employee = employee;
//# sourceMappingURL=authMiddleware.js.map