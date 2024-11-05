import prisma from './../prisma';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { TaskCreateSchema, AuthenticatedRequest } from '../types/types';

export const getUserTasks = catchAsync(
	async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		const id = req.user?.id;

		if (!id) {
			return next(
				new AppError({ statusCode: 401, message: 'Unauthorized' })
			);
		}

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
	}
);

export const getTask = catchAsync(
	async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		const id = req.user?.id;
		const taskId = req.params.id;

		if (!id) {
			return next(
				new AppError({ statusCode: 401, message: 'Unauthorized' })
			);
		}

		const task = await prisma.task.findFirst({
			where: {
				id: taskId,
				userId: id,
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
				new AppError({ statusCode: 404, message: 'Task not found' })
			);
		}

		res.status(200).json(task);
	}
);

export const createTask = catchAsync(
	async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		const id = req.user?.id;
		const body: TaskCreateSchema = req.body;

		if (!id) {
			return next(
				new AppError({ statusCode: 401, message: 'Unauthorized' })
			);
		}

		const task = await prisma.$transaction(async (tx) => {
			const createdTask = await tx.task.create({
				data: {
					userId: id,
					title: body.title,
					triggerId: '',
					actions: {
						create: body.actions.map((action, index) => ({
							availableActionsId: action.availableActionId,
							metadata: action.metaData || {},
							sortingOrder: index,
						})),
					},
				},
			});

			const trigger = await tx.trigger.create({
				data: {
					availableTriggersId: body.availableTriggerId,
					taskId: createdTask.id,
				},
			});

			await tx.task.update({
				where: {
					id: createdTask.id,
				},
				data: {
					triggerId: trigger.id,
				},
			});

			return createdTask;
		});

		res.status(201).json(task);
	}
);

export const deleteTask = catchAsync(
	async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		const taskId = req.params.id;

		if (!taskId) {
			return next(
				new AppError({
					statusCode: 401,
					message: 'Task ID is required',
				})
			);
		}

		const task = await prisma.task.findUnique({
			where: { id: taskId },
		});

		if (!task) {
			return next(
				new AppError({ statusCode: 404, message: 'Task not found' })
			);
		}

		await prisma.task.delete({
			where: {
				id: taskId,
			},
		});

		res.status(200).json('Task Deleted');
	}
);

export const updateTask = catchAsync(
	async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		const taskId = req.params.id;

		if (!taskId) {
			return next(
				new AppError({
					statusCode: 400,
					message: 'Task ID is required',
				})
			);
		}

		const { availableTriggerId, triggerMetaData, actions } = req.body;

		const updatedTask = await prisma.$transaction(async (tx) => {
			const task = await tx.task.update({
				where: {
					id: taskId,
				},
				data: {
					// Assuming you might want to update the title and description as well
					title: req.body.title,
					description: req.body.description,
					Running: req.body.Running, // Optional running state update
				},
			});

			if (availableTriggerId) {
				await tx.trigger.update({
					where: {
						taskId: taskId,
					},
					data: {
						availableTriggersId: availableTriggerId,
						metadata: triggerMetaData || {}, // Optional trigger metadata
					},
				});
			}

			if (actions) {
				await tx.action.deleteMany({
					where: {
						taskId: taskId,
					},
				});

				await tx.action.createMany({
					data: actions.map((action) => ({
						taskId: taskId,
						availableActionsId: action.availableActionId,
						metadata: action.metaData || {},
						sortingOrder: action.sortingOrder,
					})),
				});
			}

			return task;
		});

		res.status(200).json(updatedTask);
	}
);

export const toggleRunning = catchAsync(
	async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		const taskId = req.params.id;
		const { isOff } = req.body;

		const task = await prisma.task.update({
			where: {
				id: taskId,
			},
			data: {
				Running: isOff,
			},
		});

		res.status(200).json(task);
	}
);

export const getAllServicesWithConnectionStatus = catchAsync(
	async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		const userId = req.user?.id;

		// Fetch all services
		const services = await prisma.app.findMany({
			include: {
				ServiceConnection: {
					where: { userId: userId },
				},
			},
		});

		// Map services to include connection status
		const servicesWithStatus = services.map((service) => {
			const isConnected = service.ServiceConnection.length > 0;
			const connectionDetails = isConnected
				? service.ServiceConnection[0]
				: null;

			return {
				id: service.id,
				name: service.name,
				image: service.image,
				connected: isConnected ? 'Connected' : 'Disconnected',
				connectionDetails: {
					id: connectionDetails?.id,
					accessToken: connectionDetails?.accessToken,
					refreshToken: connectionDetails?.refreshToken,
					expiresAt: connectionDetails?.expiresAt,
				},
			};
		});

		res.status(200).json(servicesWithStatus);
	}
);

export const connectService = catchAsync(
	async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		const userId = req.user?.id;
		const { appId, accessToken, refreshToken, expiresAt } = req.body;

		if (!userId) {
			return next(
				new AppError({ statusCode: 401, message: 'Unauthorized' })
			);
		}

		const serviceConnection = await prisma.serviceConnection.create({
			data: {
				userId: userId,
				appId: appId,
				accessToken: accessToken,
				refreshToken: refreshToken,
				expiresAt: expiresAt,
			},
		});

		res.status(201).json({
			message: 'Service connected successfully',
			serviceConnection,
		});
	}
);

export const disconnectService = catchAsync(
	async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		const userId = req.user?.id;
		const { appId } = req.body;

		if (!userId) {
			return next(
				new AppError({ statusCode: 401, message: 'Unauthorized' })
			);
		}

		const serviceConnection = await prisma.serviceConnection.deleteMany({
			where: {
				userId: userId,
				appId: appId,
			},
		});

		if (serviceConnection.count === 0) {
			return next(
				new AppError({
					statusCode: 404,
					message: 'Service not connected',
				})
			);
		}

		res.status(200).json('Service disconnected successfully');
	}
);

export const getAllApps = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const apps = await prisma.app.findMany();

		res.status(200).json(apps);
	}
);

export const getTriggersForApp = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const appId = req.params.appId;

		const triggers = await prisma.availableTriggers.findMany({
			where: {
				appId: appId,
			},
		});

		res.status(200).json(triggers);
	}
);

export const getActionsForApp = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const appId = req.params.appId;

		const actions = await prisma.availableActions.findMany({
			where: {
				appId: appId,
			},
		});

		res.status(200).json(actions);
	}
);
