"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config/config");
const winston_1 = __importDefault(require("winston"));
const db_1 = __importDefault(require("./config/db"));
const routes_1 = __importDefault(require("./routes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
    transports: [new winston_1.default.transports.Console(), new winston_1.default.transports.File({ filename: 'app.log' })]
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
(0, db_1.default)();
app.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello Word!' });
});
app.use('/api', routes_1.default);
app.use(errorMiddleware_1.errorHandler);
app.listen(config_1.PORT, () => {
    logger.info(`Running on port ${config_1.PORT}`);
});
//# sourceMappingURL=index.js.map