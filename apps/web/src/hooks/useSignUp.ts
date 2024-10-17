import { useState } from 'react';
import { SignUpUser } from './../types/index';
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
		try {
			await signUp({ email, firstName, lastName, password });
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

	return { signUpUser, loading, error };
};
