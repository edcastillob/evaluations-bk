import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PORT } from './config/config';
import winston from 'winston';

// import routes from './routes';
import connectDB from './config/db';
import routes from './routes';
import { errorHandler } from './middlewares/errorMiddleware';

// Configuración de Winston Logger
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
	transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'app.log' })]
});

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
connectDB();
app.get('/', (req, res) => {
	res.status(200).send({ message: 'Hello Word!' });
});

app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, () => {
	logger.info(`Running on port ${PORT}`);
});
