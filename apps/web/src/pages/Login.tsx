import { Link } from 'react-router-dom';
import { Input } from '@repo/ui/Input';
import { PrimaryButton } from '@repo/ui/PrimaryButton';

export const Login = () => {
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
					<form className='bg-white p-6 rounded-lg shadow-lg space-y-4'>
						<Input
							type={'email'}
							label={'Work Email'}
							required={true}
						/>
						<Input
							type={'password'}
							label={'Password'}
							required={true}
						/>

						<PrimaryButton
							size='big'
							className='w-full'
						>
							Login
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
