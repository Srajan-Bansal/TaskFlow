import { useNavigate, Link } from 'react-router-dom';
import { LinkButton } from '@repo/ui/LinkButton';
import { PrimaryButton } from '@repo/ui/PrimaryButton';

export const Header = () => {
	const navigate = useNavigate();

	return (
		<header className='border-b'>
			<div className='container flex justify-between py-6 px-4 mx-auto'>
				<Link
					to='/'
					className='text-2xl font-extrabold'
				>
					TaskFlow{' '}
				</Link>
				<div className='flex space-x-4'>
					<LinkButton>Contact Sales</LinkButton>
					<LinkButton onClick={() => navigate('/app/login')}>
						Login
					</LinkButton>
					<PrimaryButton
						onClick={() => {
							navigate('/sign-up');
						}}
					>
						Signup
					</PrimaryButton>
				</div>
			</div>
		</header>
	);
};
