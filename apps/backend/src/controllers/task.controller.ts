import prisma from './../prisma';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { TaskCreateSchema } from '../types/types';

export const getUserTasks = catchAsync(async (req: Request, res: Response) => {
	const id = req.user?.id;

	const tasks = await prisma.task.findMany({
		where: {
			userId: id,
		},
		include: {
			actions: {
				include: {
					availableAction: true,
				},
			},
			trigger: {
				include: {
					availableTrigger: true,
				},
			},
		},
	});

	res.status(200).json(tasks);
});

export const getTask = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.user?.id;
		const taskId = req.params.id;

		if (!id) {
			return next(
				new AppError({
					statusCode: 401,
					message: 'Unauthorized',
				})
			);
		}

		const task = await prisma.task.findFirst({
			where: {
				id: taskId,
			},
			include: {
				trigger: {
					include: {
						availableTrigger: true,
					},
				},
				actions: {
					include: {
						availableAction: true,
					},
				},
			},
		});

		if (!task) {
			return next(
				new AppError({
					statusCode: 404,
					message: 'Task not found',
				})
			);
		}

		res.status(200).json(task);
	}
);

export const createTask = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.user?.id;
		const body: TaskCreateSchema = req.body;

		if (!id) {
			return next(
				new AppError({
					statusCode: 401,
					message: 'Unauthorized',
				})
			);
		}

		const taskId = await prisma.$transaction(async (tx) => {
			const task = await tx.task.create({
				data: {
					userId: id,
					triggerId: '',
					actions: {
						create: body.actions.map((action, index) => ({
							availableActionId: action.availableActionId,
							actionMetaData: action.actionMetaData,
							sortingOrder: index,
						})),
					},
				},
			});

			const trigger = await tx.trigger.create({
				data: {
					availableTriggersId: body.availableTriggerId,
					taskId: task.id,
				},
			});

			await tx.task.update({
				where: {
					id: task.id,
				},
				data: {
					triggerId: trigger.id,
				},
			});
		});

		res.status(201).json(taskId);
	}
);