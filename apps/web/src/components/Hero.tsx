import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '@repo/ui/PrimaryButton';
import { SecondaryButton } from '@repo/ui/SecondaryButton';

export const Hero = () => {
	const navigate = useNavigate();

	return (
		<div className='container mx-auto px-4 py-12'>
			<div className='flex flex-col lg:flex-row justify-between items-center'>
				<div className='lg:w-1/2 mb-8 lg:mb-0'>
					<div className='bg-purple-100 text-purple-700 text-sm font-semibold py-1 px-3 rounded-full inline-block mb-4'>
						New Zapier Enterprise is here →
					</div>
					<h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6'>
						Automate without limits
					</h1>
					<p className='text-xl md:text-2xl text-gray-700 mb-8'>
						Turn chaos into smooth operations by automating
						workflows yourself—no developers, no IT tickets, no
						delays. The only limit is your imagination.
					</p>
					<div className='flex flex-col sm:flex-row gap-4'>
						<PrimaryButton
							size='big'
							onClick={() => {
								navigate('/signup');
							}}
						>
							Start free with email
						</PrimaryButton>
						<SecondaryButton
							size='big'
							onClick={() => {}}
						>
							<img
								src='/path-to-google-icon.png'
								alt='Google'
								className='w-5 h-5 mr-2'
							/>
							Start free with Google
						</SecondaryButton>
					</div>
				</div>
				<div className='lg:w-1/2'>
					<img
						src='https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1726210651/Homepage%20%E2%80%94%20Sept%202024/homepage-hero_vvpkmi.png'
						alt='TaskFlow Automation Workflow'
						className='w-full h-auto'
					/>
				</div>
			</div>
		</div>
	);
};