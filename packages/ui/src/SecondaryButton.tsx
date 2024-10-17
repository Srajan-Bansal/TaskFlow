import { ReactNode, MouseEventHandler } from 'react';

export const SecondaryButton = ({
	children,
	onClick,
	size = 'small',
}: {
	children: ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	size?: 'big' | 'small';
}) => {
	return (
		<button
			onClick={onClick}
			className={`${size === 'small' ? 'text-sm' : 'text-xl'} ${size === 'small' ? 'px-8 py-2' : 'px-10 py-4'} cursor-pointer hover:shadow-md border text-center hover:bg-gray-100 text-gray-700 border-gray-300 rounded-full flex flex-row justify-center items-center font-bold`}
		>
			{children}
		</button>
	);
};
