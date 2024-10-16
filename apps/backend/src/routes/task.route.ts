import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { protect } from '../middleware/protect';

const router = Router();

router.use(protect);

router.get('/', taskController.getUserTasks);
router.get('/:id', taskController.getTask);
router.post('/', taskController.createTask);

export const taskRouter = router;
