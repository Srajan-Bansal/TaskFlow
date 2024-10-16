import express from 'express';
import { userRouter } from './routes/user.route';
import { taskRouter } from './routes/task.route';
import { actionRouter } from './routes/action.route';
import { triggerRouter } from './routes/trigger.route';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/task', taskRouter);
app.use('/api/v1/action', actionRouter);
app.use('/api/v1/trigger', triggerRouter);

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
