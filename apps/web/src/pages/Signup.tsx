import { Link } from 'react-router-dom';
import { Input } from '@repo/ui/Input';
import { CheckFeature } from '../components/CheckFeature';
import { PrimaryButton } from '@repo/ui/PrimaryButton';
// import { LinkButton } from '@repo/ui/LinkButton';

export const SignUp = () => {
	return (
		<div className='container mx-auto py-8'>
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
					<form className='bg-white p-6 rounded-lg shadow-lg space-y-4'>
						<Input
							type={'email'}
							label={'Work Email'}
							required={true}
						/>
						<Input
							type={'text'}
							label={'First Name'}
							required={true}
						/>
						<Input
							type={'text'}
							label={'Last Name'}
							required={true}
						/>

						<PrimaryButton
							onClick={() => {}}
							size='big'
							className='w-full'
						>
							Get started free
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
