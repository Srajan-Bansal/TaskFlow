import { useState } from 'react';
import { SignUpUser } from '../types/types';
import { signUp } from '../lib/api';

export const useSignUp = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const signUpUser = async ({
		email,
		firstName,
		lastName,
		password,
	}: SignUpUser) => {
		setLoading(true);
		setError(null);
		try {
			await signUp({ email, firstName, lastName, password });
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

	return { signUpUser, loading, error };
};
