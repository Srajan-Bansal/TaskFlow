import { ReactNode, MouseEventHandler } from 'react';

export const PrimaryButton = ({
	children,
	onClick,
	size = 'small',
	className,
	disabled = false,
}: {
	children: ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	size?: 'big' | 'small';
	className?: string;
	disabled?: boolean;
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${size === 'small' ? 'text-sm' : 'text-xl'} ${size === 'small' ? 'px-8 py-2' : 'px-10 py-4'} cursor-pointer hover:shadow-md text-white font-extrabold rounded-full flex flex-row justify-center items-center ${className}`}
			style={{ backgroundColor: '#ff4f00' }}
		>
			{children}
		</button>
	);
};
