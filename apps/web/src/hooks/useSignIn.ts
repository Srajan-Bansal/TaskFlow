import { useState } from 'react';
import { SignInUser } from './../types/index';
import { signIn } from '../lib/api';

export const useSignIn = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const signInUser = async ({ email, password }: SignInUser) => {
		setLoading(true);
		try {
			await signIn({ email, password });
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err);
			} else {
				setError(new Error('An unknown error occurred'));
			}
		} finally {
			setLoading(false);
		}
	};

	return { signInUser, loading, error };
};
