import { Router, Response, Request } from 'express';
import { client } from '../prisma';

const router = Router();

router.get('/availableActions', async (req: Request, res: Response) => {
	const availableActions = await client.availableActions.findMany({});

	res.json(200).json(availableActions);
});

export const actionRouter = router;
