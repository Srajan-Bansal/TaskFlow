import { X } from 'lucide-react';

export function FlowModal({
	isOpen,
	onClose,
	title = 'Edit Node',
	children,
}: {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
}) {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center'>
			<div className='bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
				{/* Header */}
				<div className='flex items-center justify-between p-4 border-b'>
					<h3 className='text-lg font-semibold text-gray-900'>
						{title}
					</h3>
					<button
						onClick={onClose}
						className='p-1 hover:bg-gray-100 rounded-full transition-colors'
					>
						<X className='w-5 h-5 text-gray-500' />
					</button>
				</div>

				{/* Content */}
				<div className='p-4'>{children}</div>

				{/* Footer */}
				<div className='flex justify-end gap-3 p-4 border-t'>
					<button
						onClick={onClose}
						className='px-4 py-2 text-sm border rounded-lg hover:bg-gray-50'
					>
						Cancel
					</button>
					<button
						onClick={onClose}
						className='px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700'
					>
						Save Changes
					</button>
				</div>
			</div>
		</div>
	);
}
