import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@repo/ui/Input';
import { CheckFeature } from '../components/CheckFeature';
import { PrimaryButton } from '@repo/ui/PrimaryButton';
import { SignUpUser } from '../types/types';
import { showErrorToast } from '../lib/toaster';
import { useSignUp } from '../hooks/useSignUp';
import { useContextAPI } from '../Context/ContextAPI';

export const Signup = () => {
	const [user, setUser] = useState<SignUpUser>({
		email: '',
		firstName: '',
		lastName: '',
		password: '',
	});
	const { signUpUser, loading, error } = useSignUp();
	const { setIsAuthenticated } = useContextAPI();
	const navigate = useNavigate();

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const success = await signUpUser(user);
			if (success) {
				setIsAuthenticated(true);
				navigate('/app/home');
			}
		} catch (err) {
			showErrorToast('Sign-up failed. Please try again.');
			console.error(err);
		}
	};

	return (
		<div className='container mx-auto py-20'>
			<div className='flex flex-row justify-between items-center'>
				<div className='sm:w-1/3 lg:w-2/5 space-y-7'>
					<h1 className='font-semibold text-4xl lg:text-5xl'>
						Join millions worldwide who automate their work using
						Zapier.
					</h1>

					<CheckFeature label='Easy setup, no coding required' />
					<CheckFeature label='Free forever for core features' />
					<CheckFeature label='14-day trial of premium features & apps' />
				</div>

				<div className='lg:w-2/5 sm:w-100 ml-10'>
					<form
						className='bg-white p-6 rounded-lg shadow-lg space-y-4'
						onSubmit={handleSignUp}
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
							type={'text'}
							label={'First Name'}
							required={true}
							onChange={(e) =>
								setUser({ ...user, firstName: e.target.value })
							}
						/>
						<Input
							type={'text'}
							label={'Last Name'}
							required={true}
							onChange={(e) =>
								setUser({ ...user, lastName: e.target.value })
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
							{loading ? 'Signing Up' : 'Get started free'}
						</PrimaryButton>
						<p className='text-sm text-gray-600 text-center'>
							By signing up, you agree to TaskFlow's{' '}
							<Link
								to='/'
								className='text-blue-600 hover:underline'
							>
								terms of service
							</Link>{' '}
							and{' '}
							<Link
								to='/'
								className='text-blue-600 hover:underline'
							>
								privacy policy
							</Link>
							.
						</p>
					</form>
				</div>
			</div>

			<div className='mt-12 text-center'>
				<p className='text-gray-600 mb-4'>
					Trusted at companies large and small
				</p>
				{/* <div className='flex justify-center items-center space-x-8'>
				{/* Replace with actual logos */}
				{/* <img
					src='/path-to-dropbox-logo.png'
					alt='Dropbox'
					className='h-8'
				/>
				<img
					src='/path-to-lyft-logo.png'
					alt='Lyft'
					className='h-8'
				/>
				<img
					src='/path-to-hellofresh-logo.png'
					alt='HelloFresh'
					className='h-8'
				/>
				<img
					src='/path-to-asana-logo.png'
					alt='Asana'
					className='h-8'
				/>
				<img
					src='/path-to-zendesk-logo.png'
					alt='Zendesk'
					className='h-8'
				/> */}
				{/* </div> */}
			</div>
		</div>
	);
};
