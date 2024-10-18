import { useState } from 'react';
import { SignInUser } from '../types/types';
import { signIn } from '../lib/api';

export const useSignIn = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const signInUser = async ({ email, password }: SignInUser) => {
		setLoading(true);
		setError(null);
		try {
			await signIn({ email, password });
			return true;
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err);
				throw err;
			} else {
				const error = new Error('An unknown error occurred');
				setError(error);
				throw error;
			}
		} finally {
			setLoading(false);
		}
	};

	return { signInUser, loading, error };
};
