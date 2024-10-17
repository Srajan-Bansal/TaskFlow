import prisma from '@repo/db';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

export const protect = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const token = req.cookies.jwt;
		console.log('refwefwefew', req.cookies.jwt);
		if (!token) {
			return next(
				new AppError({
					statusCode: 401,
					message:
						'You are not logged in. Please log in to get access',
				})
			);
		}

		const decoded: JwtPayload = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as JwtPayload;

		const user = await prisma.user.findUnique({
			where: {
				id: decoded.id,
			},
		});

		if (!user) {
			return next(
				new AppError({
					statusCode: 401,
					message:
						'The user belonging to this token does no longer exist',
				})
			);
		}

		// @ts-ignore
		req.user = user;
		next();
	}
);
