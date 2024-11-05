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
router.patch('/:id/toggleRunning', taskController.toggleRunning);
router.get('/apps', taskController.getAllApps);
router.get('/services', taskController.getAllServicesWithConnectionStatus);
router.post('/connect', taskController.connectService);
router.post('/disconnect', taskController.disconnectService);
router.get('/app/:appId/triggers', taskController.getTriggersForApp);
router.get('/app/:appId/actions', taskController.getActionsForApp);

export const taskRouter = router;
