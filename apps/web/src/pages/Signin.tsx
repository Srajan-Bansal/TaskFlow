import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@repo/ui/Input';
import { PrimaryButton } from '@repo/ui/PrimaryButton';
import { SignInUser } from '../types/types';
import { useSignIn } from '../hooks/useSignIn';
import { showErrorToast, TOAST_MESSAGES } from '../lib/toaster';
import { useContextAPI } from '../Context/ContexrAPI';

export const Signin = () => {
	const [user, setUser] = useState<SignInUser>({
		email: '',
		password: '',
	});
	const { signInUser, loading, error } = useSignIn();
	const { setIsAuthenticated } = useContextAPI();
	const navigate = useNavigate();

	async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const success = await signInUser(user);
			if (success) {
				setIsAuthenticated(true);
				navigate('/app/home');
			}
		} catch (err) {
			showErrorToast(TOAST_MESSAGES.AUTH.LOGIN_ERROR);
			console.error('err', err);
		}
	}
	return (
		<div className='container mx-auto py-20'>
			<div className='flex flex-row justify-between items-center'>
				<div className='sm:w-2/5 lg:w-2/5 space-y-7'>
					<h1 className='font-semibold text-4xl lg:text-5xl'>
						Automate across your teams
					</h1>

					<p className='text-xl md:text-2xl text-gray-700 mb-8'>
						TaskFlow Enterprise empowers everyone in your business
						to securely automate their work in minutes, not
						months—no coding required.
					</p>
				</div>

				<div className='lg:w-2/5 sm:w-full ml-10 space-y-10'>
					<div className=' font-semibold text-4xl lg:text-5xl text-center'>
						Log in to your account
					</div>
					<form
						className='bg-white p-6 rounded-lg shadow-lg space-y-4'
						onSubmit={handleSignIn}
					>
						<Input
							type={'email'}
							label={'Work Email'}
							required={true}
							onChange={(e) =>
								setUser({ ...user, email: e.target.value })
							}
						/>
						<Input
							type={'password'}
							label={'Password'}
							required={true}
							onChange={(e) =>
								setUser({ ...user, password: e.target.value })
							}
						/>

						{error && (
							<p className='text-red-600 text-sm'>
								{error.message}
							</p>
						)}

						<PrimaryButton
							size='big'
							className='w-full'
							disabled={loading}
						>
							{loading ? 'Loging in' : 'Log In'}
						</PrimaryButton>
						<p className='text-medium text-gray-600 text-center'>
							Don't have a TaskFlow account yet?{' '}
							<Link
								to='/signup'
								className='text-blue-600 underline hover:text-blue-800'
							>
								Sign Up
							</Link>{' '}
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};
