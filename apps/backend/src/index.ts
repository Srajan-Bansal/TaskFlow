import express from 'express';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/auth.route';

const app = express();

app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'secret',
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
	res.send('Hello World');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log('Server is running on port 3000');
});
