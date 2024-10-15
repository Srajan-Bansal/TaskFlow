import { ReactNode } from 'react';

export const PrimaryButton = ({
	children,
	onClick,
	size = 'small',
	className,
}: {
	children: ReactNode;
	onClick: () => void;
	size?: 'big' | 'small';
	className?: string;
}) => {
	return (
		<button
			onClick={onClick}
			className={`${size === 'small' ? 'text-sm' : 'text-xl'} ${size === 'small' ? 'px-8 py-2' : 'px-10 py-4'} cursor-pointer hover:shadow-md text-white font-extrabold rounded-full flex flex-row justify-center items-center ${className}`}
			style={{ backgroundColor: '#ff4f00' }}
		>
			{children}
		</button>
	);
};
