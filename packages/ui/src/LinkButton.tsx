import { ReactNode, MouseEventHandler } from 'react';

export const LinkButton = ({
	children,
	onClick,
}: {
	children: ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
	return (
		<button
			className='flex justify-center px-2 py-2 cursor-pointer hover:bg-slate-100 font-light text-sm rounded my-auto'
			onClick={onClick}
		>
			{children}
		</button>
	);
};
