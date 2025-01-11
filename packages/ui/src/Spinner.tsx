export const Spinner = ({ size }: { size?: 'sm' | 'md' | 'lg' }) => {
	return (
		<div className='flex items-center justify-center h-screen'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width={size === 'sm' ? '24' : size === 'md' ? '36' : '48'}
				height={size === 'sm' ? '24' : size === 'md' ? '36' : '48'}
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='animate-spin text-blue-500'
			>
				<path d='M21 12a9 9 0 1 1-6.219-8.56' />
			</svg>
		</div>
	);
};
