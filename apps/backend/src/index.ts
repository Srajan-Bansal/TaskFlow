import express, { Request, Response, NextFunction } from 'express';
import { userRouter } from './routes/user.route';
import { taskRouter } from './routes/task.route';
import { actionRouter } from './routes/action.route';
import { triggerRouter } from './routes/trigger.route';
import { adminRouter } from './routes/admin.route';
import cors from 'cors';
import ErrorResponse from './types/types';
import AppError from './utils/appError';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

if (process.env.ENVIRONMENT === 'development') {
	app.use(morgan('dev'));
}

app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	})
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/task', taskRouter);
app.use('/api/v1/action', actionRouter);
app.use('/api/v1/trigger', triggerRouter);
app.use('/api/v1/admin', adminRouter);

app.use('*', (req, res, next) => {
	next(
		new AppError({
			statusCode: 404,
			message: `Can't find ${req.originalUrl} on this server!`,
		})
	);
});

app.use(
	({
		err,
		req,
		res,
		next,
	}: {
		err: ErrorResponse;
		req: Request;
		res: Response;
		next: NextFunction;
	}) => {
		err.statusCode = err.statusCode || 500;
		err.message = err.message || 'Something went wrong!';

		console.log(err);

		res.status(err.statusCode).json({
			message: err.message,
		});
	}
);

app.use('*', (req, res, next) => {
	next(
		new AppError({
			statusCode: 404,
			message: `Can't find ${req.originalUrl} on this server!`,
		})
	);
});

app.use(
	({
		err,
		req,
		res,
		next,
	}: {
		err: ErrorResponse;
		req: Request;
		res: Response;
		next: NextFunction;
	}) => {
		err.statusCode = err.statusCode || 500;
		err.message = err.message || 'Something went wrong!';

		console.log(err);

		res.status(err.statusCode).json({
			message: err.message,
		});
	}
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log('Server is running on port 3000');
});
