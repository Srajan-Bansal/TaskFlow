import { Router } from 'express';
import {
	login,
	logout,
	signup,
	verifyUser,
} from '../controllers/auth.controller';
import { protect } from '../middleware/protect';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

router.use(protect);

router.post('/logout', logout);
router.get('/verify', verifyUser);

export const userRouter = router;
