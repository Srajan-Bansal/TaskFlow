import { ChangeEventHandler } from 'react';

export const Input = ({
	type = 'text',
	label,
	required,
	onChange = () => {},
	placeholder,
}: {
	type: string;
	label: string;
	required?: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	placeholder?: string;
}) => (
	<div className='flex flex-col justify-center space-y-4'>
		<label
			htmlFor={label}
			className='font-semibold text-gray-800'
		>
			<span className='px-1'>{required && '*'}</span>
			{label}
			<span className='px-2 font-semibold text-gray-600'>
				{required && '(required)'}
			</span>
		</label>
		<input
			id={label}
			className='p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-12'
			type={type}
			required={required}
			onChange={onChange}
			placeholder={placeholder}
		/>
	</div>
);
