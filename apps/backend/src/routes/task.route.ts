import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { protect } from '../middleware/protect';

const router = Router();

router.use(protect);

router.get('/getUserTasks', taskController.getUserTasks);
router.get('/:id', taskController.getTask);
router.post('/', taskController.createTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id', taskController.updateTask);

export const taskRouter = router;
