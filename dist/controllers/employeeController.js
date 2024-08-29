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
exports.imageUploader = exports.putUser = exports.getReportByUser = exports.deleteUserById = exports.getUserById = exports.getAllUserByRole = exports.getAllUser = exports.getAllEmployees = void 0;
const User_1 = __importDefault(require("../models/User"));
const custom_exception_1 = require("../exceptions/custom-exception");
const valid_object_id_1 = require("../utils/valid-object-id");
const put_user_validator_1 = require("../validators/put-user-validator");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const Evaluation_1 = __importDefault(require("../models/Evaluation"));
const Feedback_1 = __importDefault(require("../models/Feedback"));
const getAllEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(1000);
    try {
        const employees = yield User_1.default.find({ role: 'Employee' });
        if (!employees.length) {
            throw (0, custom_exception_1.createCustomException)('Employees not found', 404);
        }
        return res.status(200).json(employees);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllEmployees = getAllEmployees;
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.find();
        if (!user.length) {
            throw (0, custom_exception_1.createCustomException)('Users not found', 404);
        }
        return res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUser = getAllUser;
const getAllUserByRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.params;
        if (!role || typeof role !== 'string') {
            throw (0, custom_exception_1.createCustomException)('Role is required and must be a string', 400);
        }
        const users = yield User_1.default.find({ role });
        if (!users.length) {
            throw (0, custom_exception_1.createCustomException)('Users not found', 404);
        }
        return res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUserByRole = getAllUserByRole;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        (0, valid_object_id_1.isValidObjectId)(userId);
        const user = yield User_1.default.findOne({ _id: userId });
        if (!user) {
            throw (0, custom_exception_1.createCustomException)('User not found', 404);
        }
        return res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
const deleteUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        (0, valid_object_id_1.isValidObjectId)(userId);
        const user = yield User_1.default.findOne({ _id: userId });
        if (!user) {
            throw (0, custom_exception_1.createCustomException)('User not found', 404);
        }
        yield User_1.default.findByIdAndDelete(userId);
        return res.status(200).send('User successfully deleted');
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUserById = deleteUserById;
const getReportByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        (0, valid_object_id_1.isValidObjectId)(userId);
        const user = yield User_1.default.findOne({ _id: userId });
        if (!user) {
            throw (0, custom_exception_1.createCustomException)('User not found', 404);
        }
        const evaluations = yield Evaluation_1.default.find({ id_user: userId })
            .populate('id_user', 'first_name last_name')
            .populate('id_evaluator', 'first_name last_name');
        const feedbacks = yield Feedback_1.default.find({ id_user: userId })
            .populate('id_user', 'first_name last_name')
            .populate('id_evaluator', 'first_name last_name');
        return res.status(200).json(Object.assign(Object.assign({}, user.toObject()), { evaluations,
            feedbacks }));
    }
    catch (error) {
        next(error);
    }
});
exports.getReportByUser = getReportByUser;
const putUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const putUserData = req.body;
    try {
        (0, valid_object_id_1.isValidObjectId)(userId);
        const user = yield User_1.default.findById(userId);
        if (!user) {
            throw (0, custom_exception_1.createCustomException)('User not found', 404);
        }
        const validation = (0, put_user_validator_1.validatePutUserData)(putUserData);
        if (validation instanceof Error) {
            const errors = JSON.parse(validation.message);
            throw (0, custom_exception_1.createCustomException)(errors, 400);
        }
        if (req.file) {
            const imageFile = req.file;
            const result = yield cloudinary_1.default.uploader.upload(imageFile.path);
            putUserData.image_url = result.secure_url;
        }
        const updatedUser = yield User_1.default.findByIdAndUpdate(userId, { $set: putUserData }, { new: true, omitUndefined: true });
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.putUser = putUser;
const imageUploader = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file was uploaded' });
        }
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const imageFile = req.file;
        const result = yield cloudinary_1.default.uploader.upload(imageFile.path);
        user.image_url = result.secure_url;
        yield user.save();
        res.status(200).json({ message: 'Image uploaded successfully!', data: { imageUrl: user.image_url } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error uploading image: ${error.message}` });
    }
});
exports.imageUploader = imageUploader;
//# sourceMappingURL=employeeController.js.map