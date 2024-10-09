import { Router } from 'express';
import passport from 'passport';
import { client } from '../prisma';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/signup', async (req, res) => {
	const { email, password, name } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await client.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		});
		res.status(201).json({
			message: 'User created successfully',
			userId: user.id,
		});
	} catch (error) {
		res.status(400).json({ message: 'Error creating user', error });
	}
});

// Local authentication (login)
router.post('/login', passport.authenticate('local'), (req, res) => {
	res.status(200).json({ message: 'Logged in successfully', user: req.user });
});

// Google authentication
router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/auth/failure' }),
	(req, res) => {
		res.status(200).json({
			message: 'Google authentication successful',
			user: req.user,
		});
	}
);

// Discord authentication
router.get('/discord', passport.authenticate('discord'));
router.get(
	'/discord/callback',
	passport.authenticate('discord', { failureRedirect: '/auth/failure' }),
	(req, res) => {
		res.status(200).json({
			message: 'Discord authentication successful',
			user: req.user,
		});
	}
);

// GitHub authentication
router.get('/github', passport.authenticate('github'));
router.get(
	'/github/callback',
	passport.authenticate('github', { failureRedirect: '/auth/failure' }),
	(req, res) => {
		res.status(200).json({
			message: 'GitHub authentication successful',
			user: req.user,
		});
	}
);

router.get('/failure', (req, res) => {
	res.status(401).json({
		message: 'Authentication failed',
	});
});

// Logout route
router.get('/logout', (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.status(200).json({ message: 'Logged out successfully' });
	});
});

export default router;
