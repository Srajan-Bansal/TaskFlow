import { ReactNode, MouseEventHandler } from 'react';

export const DarkButton = ({
	children,
	onClick,
}: {
	children: ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;

	size?: 'big' | 'small';
}) => {
	return (
		<button
			onClick={onClick}
			className={`px-6 py-2 cursor-pointer hover:shadow-lg border text-center flex flex-row justify-center items-center font-bold bg-[#3d4592] text-white`}
		>
			{children}
		</button>
	);
};
