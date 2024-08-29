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
exports.getAllEvaluation = exports.deleteEvaluation = exports.putEvaluation = exports.getEvaluatorById = exports.getEvaluationByUser = exports.viewAllEvaluation = exports.getEvaluationById = exports.postEvaluation = void 0;
const custom_exception_1 = require("../exceptions/custom-exception");
const Evaluation_1 = __importDefault(require("../models/Evaluation"));
const evaluation_validator_1 = require("../validators/evaluation-validator");
const Adaptability_1 = __importDefault(require("../models/Adaptability"));
const User_1 = __importDefault(require("../models/User"));
const IdTechnicalSkills_1 = __importDefault(require("../models/IdTechnicalSkills"));
const Comunication_1 = __importDefault(require("../models/Comunication"));
const Teamwork_1 = __importDefault(require("../models/Teamwork"));
const TimeManagement_1 = __importDefault(require("../models/TimeManagement"));
const SoftSkills_1 = __importDefault(require("../models/SoftSkills"));
const valid_object_id_1 = require("../utils/valid-object-id");
const postEvaluation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const EvaluationData = req.body;
    try {
        const validation = (0, evaluation_validator_1.validateEvaluationData)(EvaluationData);
        if (validation instanceof Error) {
            const errors = JSON.parse(validation.message);
            throw (0, custom_exception_1.createCustomException)(errors, 400);
        }
        yield validateEvaluationIds(EvaluationData);
        const evaluation = yield Evaluation_1.default.create(EvaluationData);
        return res.status(201).json(evaluation);
    }
    catch (error) {
        next(error);
    }
});
exports.postEvaluation = postEvaluation;
const getEvaluationById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { evaluationId } = req.params;
    try {
        (0, valid_object_id_1.isValidObjectId)(evaluationId);
        const evaluation = yield Evaluation_1.default.findById({ _id: evaluationId });
        if (!evaluation) {
            throw (0, custom_exception_1.createCustomException)('Evaluation not found', 404);
        }
        return res.status(200).json(evaluation);
    }
    catch (error) {
        next(error);
    }
});
exports.getEvaluationById = getEvaluationById;
const viewAllEvaluation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const evaluations = yield Evaluation_1.default.find()
            .populate('id_user', 'first_name last_name')
            .populate('id_evaluator', 'first_name last_name')
            .exec();
        if (!evaluations.length) {
            throw (0, custom_exception_1.createCustomException)('No evaluations found', 404);
        }
        return res.status(200).json(evaluations);
    }
    catch (error) {
        next(error);
    }
});
exports.viewAllEvaluation = viewAllEvaluation;
const getEvaluationByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { employeeId } = req.params;
    try {
        (0, valid_object_id_1.isValidObjectId)(employeeId);
        const evaluation = yield Evaluation_1.default.find({ id_user: employeeId });
        if (!evaluation) {
            throw (0, custom_exception_1.createCustomException)('User rating not found', 404);
        }
        return res.status(200).json(evaluation);
    }
    catch (error) {
        next(error);
    }
});
exports.getEvaluationByUser = getEvaluationByUser;
const getEvaluatorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { evaluatorId } = req.params;
    try {
        (0, valid_object_id_1.isValidObjectId)(evaluatorId);
        const evaluation = yield Evaluation_1.default.findOne({ id_evaluator: evaluatorId });
        if (!evaluation) {
            throw (0, custom_exception_1.createCustomException)('Evaluator rating not found', 404);
        }
        return res.status(200).json(evaluation);
    }
    catch (error) {
        next(error);
    }
});
exports.getEvaluatorById = getEvaluatorById;
const putEvaluation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { evaluationId } = req.params;
    const evaluationData = req.body;
    try {
        (0, valid_object_id_1.isValidObjectId)(evaluationId);
        const evaluation = yield Evaluation_1.default.findById(evaluationId);
        if (!evaluation) {
            throw (0, custom_exception_1.createCustomException)('Evaluator rating not found', 404);
        }
        const validation = (0, evaluation_validator_1.validateEvaluationData)(evaluationData);
        if (validation instanceof Error) {
            const errors = JSON.parse(validation.message);
            throw (0, custom_exception_1.createCustomException)(errors, 400);
        }
        yield validateEvaluationIds(evaluationData);
        const updatedEvaluation = yield Evaluation_1.default.findByIdAndUpdate(evaluationId, { $set: evaluationData }, { new: true });
        return res.status(200).json(updatedEvaluation);
    }
    catch (error) {
        next(error);
    }
});
exports.putEvaluation = putEvaluation;
const deleteEvaluation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { evaluationId } = req.params;
    try {
        (0, valid_object_id_1.isValidObjectId)(evaluationId);
        const evaluation = yield Evaluation_1.default.findById(evaluationId);
        if (!evaluation) {
            throw (0, custom_exception_1.createCustomException)('Evaluator rating not found', 404);
        }
        yield Evaluation_1.default.findByIdAndDelete(evaluationId);
        return res.status(200).send('Evaluation successfully deleted');
    }
    catch (error) {
        next(error);
    }
});
exports.deleteEvaluation = deleteEvaluation;
const getAllEvaluation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [adaptability, comunication, softSkills, teamwork, technicalSkills, timeManagement] = yield Promise.all([
            Adaptability_1.default.find({}).sort({ points: 1 }),
            Comunication_1.default.find({}).sort({ points: 1 }),
            SoftSkills_1.default.find({}).sort({ points: 1 }),
            Teamwork_1.default.find({}).sort({ points: 1 }),
            IdTechnicalSkills_1.default.find({}).sort({ points: 1 }),
            TimeManagement_1.default.find({}).sort({ points: 1 })
        ]);
        const result = {
            adaptability,
            comunication,
            soft_skills: softSkills,
            teamwork,
            technical_skills: technicalSkills,
            time_management: timeManagement
        };
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllEvaluation = getAllEvaluation;
const validateEvaluationIds = (EvaluationData) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_adaptability, id_user, id_technical_skills, id_comunication, id_teamwork, id_time_management, id_soft_skills, id_evaluator } = EvaluationData;
    const _id_adaptability = yield Adaptability_1.default.findOne({ _id: id_adaptability });
    console.log(_id_adaptability);
    if (!_id_adaptability) {
        throw (0, custom_exception_1.createCustomException)('id_adaptability not found', 404);
    }
    const _id_user = yield User_1.default.findOne({ _id: id_user });
    if (!_id_user) {
        throw (0, custom_exception_1.createCustomException)('id_user not found', 404);
    }
    const _id_technical_skills = yield IdTechnicalSkills_1.default.findOne({ _id: id_technical_skills });
    if (!_id_technical_skills) {
        throw (0, custom_exception_1.createCustomException)('id_technical_skills not found', 404);
    }
    const _id_comunication = yield Comunication_1.default.findOne({ _id: id_comunication });
    if (!_id_comunication) {
        throw (0, custom_exception_1.createCustomException)('id_comunication not found', 404);
    }
    const _id_time_management = yield TimeManagement_1.default.findOne({ _id: id_time_management });
    if (!_id_time_management) {
        throw (0, custom_exception_1.createCustomException)('id_time_management not found', 404);
    }
    const _id_teamwork = yield Teamwork_1.default.findOne({ _id: id_teamwork });
    if (!_id_teamwork) {
        throw (0, custom_exception_1.createCustomException)('id_teamwork not found', 404);
    }
    const _id_soft_skills = yield SoftSkills_1.default.findOne({ _id: id_soft_skills });
    if (!_id_soft_skills) {
        throw (0, custom_exception_1.createCustomException)('id_soft_skills not found', 404);
    }
    const _id_evaluator = yield User_1.default.findOne({ _id: id_evaluator });
    if (!_id_evaluator) {
        throw (0, custom_exception_1.createCustomException)('id_evaluator not found', 404);
    }
    if (id_user === id_evaluator) {
        throw (0, custom_exception_1.createCustomException)('The evaluator user and the evaluated user are the same', 409);
    }
});
//# sourceMappingURL=evaluationController.js.map