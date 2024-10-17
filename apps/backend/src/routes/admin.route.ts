import { Router } from 'express';
import prisma from '@repo/db';

const router = Router();

router.delete('/deleteAllUsers', (req, res) => {
	prisma.user.deleteMany().then(() => {
		res.status(200).json({ message: 'All users deleted' });
	});
});

export const adminRouter = router;
