import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();

const client = new PrismaClient();

app.post('hooks/catch/:userId/:taskId', async (req, res) => {
	const { userId, taskId } = req.params;
	const body = req.body;

	await client.$transaction(async (tx) => {
		const run = await tx.taskRun.create({
			data: {
				taskId: taskId,
				metadata: body,
			},
		});

		await tx.taskRunOutbox.create({
			data: {
				taskRunId: run.id,
			},
		});
	});

	res.status(200).json({
		message: 'webhook received',
	});
});

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(8000, () => {
	console.log('Server is running on port 8000');
});
