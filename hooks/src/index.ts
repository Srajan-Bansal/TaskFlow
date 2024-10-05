import express from 'express';

const app = express();

app.post('hooks/catch/:userId/:taskId', (req, res) => {
	const { userId, taskId } = req.params;

	// store in db a new trigger

	// push it on to a redis queue
});

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(8000, () => {
	console.log('Server is running on port 8000');
});
