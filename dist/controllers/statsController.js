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
exports.getStats = void 0;
const User_1 = __importDefault(require("../models/User"));
const Evaluation_1 = __importDefault(require("../models/Evaluation"));
const getStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalUsers = yield User_1.default.countDocuments();
        const userAdmins = yield User_1.default.countDocuments({ role: 'Admin' });
        const userEmployees = yield User_1.default.countDocuments({ role: 'Employee' });
        const userManagers = yield User_1.default.countDocuments({ role: 'Manager' });
        const activeUsers = yield User_1.default.countDocuments({ active: true });
        const totalEvaluations = yield Evaluation_1.default.countDocuments();
        const evaluationsWithEvaluator = yield Evaluation_1.default.countDocuments({ id_evaluator: { $ne: null } });
        const response = {
            users: totalUsers,
            evaluations: totalEvaluations,
            user_manager: userManagers,
            user_admin: userAdmins,
            user_employee: userEmployees,
            user_active: activeUsers
        };
        return res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.getStats = getStats;
//# sourceMappingURL=statsController.js.map