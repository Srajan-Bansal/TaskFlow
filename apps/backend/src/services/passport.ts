import passport from 'passport';
import { Strategy as LocalStategy } from 'passport-local';
import { Strategy as GoogleStraegy } from 'passport-google-oauth20';
import { Strategy as DiscordStrategy } from 'passport-discord';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { VerifyCallback } from 'passport-google-oauth20';
import { client } from './../prisma';
import bcrypt from 'bcryptjs';

passport.use(
	new LocalStategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email: string, password: string, done) => {
			try {
				const user = await client.user.findUnique({
					where: { email: email },
				});

				if (
					!user ||
					!(await bcrypt.compare(password, user.password || ''))
				) {
					return done(null, false, {
						message: 'Invalid email or password',
					});
				}
				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

passport.use(
	new GoogleStraegy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			callbackURL: '/auth/google/callback',
		},
		async (
			accessTokken: string,
			refreshToken: string,
			profile,
			done: VerifyCallback
		) => {
			try {
				const email =
					profile.emails && profile.emails.length > 0
						? profile.emails[0].value
						: null;

				if (!email) {
					return done(null, false, {
						message: 'Email not provided by Google',
					});
				}

				let user = await client.user.findUnique({
					where: {
						googleId: profile.id,
					},
				});

				if (!user) {
					user = await client.user.create({
						data: {
							name: profile.displayName,
							googleId: profile.id,
							email: email,
						},
					});
				}
				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

passport.use(
	new DiscordStrategy(
		{
			clientID: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
			callbackURL: '/auth/discord/callback',
		},
		async (accessToken: string, refreshToken: string, profile, done) => {
			try {
				let user = await client.user.findUnique({
					where: {
						discordId: profile.id,
					},
				});

				if (!user) {
					user = await client.user.create({
						data: {
							name: profile.username,
							email: profile.email as string,
							discordId: profile.id,
						},
					});
				}
				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

type GitHubProfile = {
	id: string;
	username: string;
	email: string;
};

passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
			callbackURL: '/auth/github/callback',
		},
		async (
			accessToken: string,
			refreshToken: string,
			profile: GitHubProfile,
			done: VerifyCallback
		) => {
			try {
				let user = await client.user.findUnique({
					where: {
						githubId: profile.id,
					},
				});

				if (!user) {
					user = await client.user.create({
						data: {
							name: profile.username,
							email: profile.email,
							githubId: profile.id,
						},
					});
				}
				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done) => {
	done(null, user?.id);
});

passport.deserializeUser(async (id: string, done) => {
	try {
		const user = await client.user.findUnique({ where: { id } });
		done(null, user);
	} catch (error) {
		done(error);
	}
});
