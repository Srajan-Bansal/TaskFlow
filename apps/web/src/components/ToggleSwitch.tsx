export function ToggleSwitch({
	toggleEnable,
	onClick,
}: {
	toggleEnable: boolean;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
				toggleEnable ? 'bg-blue-600' : 'bg-gray-200'
			}`}
		>
			<span className='sr-only'>Toggle switch</span>
			<span
				className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
					toggleEnable ? 'translate-x-6' : 'translate-x-1'
				}`}
			/>
		</button>
	);
}
