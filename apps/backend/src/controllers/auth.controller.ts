import { Request, Response, NextFunction, CookieOptions } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import bcrypt from 'bcryptjs';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

const generateToken = (id: string): string => {
	return jwt.sign({ id }, process.env.JWT_SECRET as string, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const sendCookie = (res: Response, token: string) => {
	const cookieOptions: CookieOptions = {
		maxAge:
			parseInt(process.env.JWT_COOKIE_EXPIRES_IN as string) *
			24 *
			60 *
			60 *
			1000,
		httpOnly: true,
		sameSite: process.env.ENVIRONMENT === 'production' ? 'none' : 'lax',
		secure: process.env.ENVIRONMENT === 'production',
	};
	res.cookie('authToken', token, cookieOptions);
};

export const signup = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		let { firstName, lastName, email, password } = req.body;
		if (!firstName || !lastName || !email || !password) {
			return next(
				new AppError({
					statusCode: 400,
					message: 'Name, email and password are required',
				})
			);
		}

		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return next(
				new AppError({
					message: 'User already exists with this email',
					statusCode: 400,
				})
			);
		}

		password = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				FirstName: firstName,
				LastName: lastName,
				email,
				password,
			},
		});

		if (!user) {
			return next(
				new AppError({
					statusCode: 500,
					message: 'Error creating user',
				})
			);
		}

		const token = generateToken(user.id);
		sendCookie(res, token);

		const userData = {
			firstName: user.FirstName,
			lastName: user.LastName,
			email: user.email,
		};

		res.status(201).json(userData);
	}
);

export const login = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;
		if (!email || !password) {
			return next(
				new AppError({
					statusCode: 400,
					message: 'Email and password are required',
				})
			);
		}

		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (
			!user ||
			!(await bcrypt.compare(password, user.password as string))
		) {
			return next(
				new AppError({
					statusCode: 401,
					message: 'Invalid email or password',
				})
			);
		}

		const token = generateToken(user.id);
		sendCookie(res, token);

		const userData = {
			firstName: user.FirstName,
			lastName: user.LastName,
			email: user.email,
		};

		res.status(200).json(userData);
	}
);

export const logout = async (req: Request, res: Response) => {
	res.cookie('authToken', '', {
		maxAge: 0,
		httpOnly: true,
	});
	res.status(200).send('User is logout');
};

export const verifyUser = catchAsync(async (req: Request, res: Response) => {
	const token = req.cookies.authToken;
	if (!token) {
		return res.status(200).json({ ok: false });
	}

	const decoded = jwt.verify(
		token,
		process.env.JWT_SECRET as string
	) as jwt.JwtPayload;

	const user = await prisma.user.findUnique({
		where: {
			id: decoded.id,
		},
		select: {
			FirstName: true,
			LastName: true,
			email: true,
		},
	});

	if (!user) {
		return res.status(200).json({ ok: false });
	}

	res.status(200).json({ ok: true, data: user });
});
