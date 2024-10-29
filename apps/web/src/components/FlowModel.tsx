import { X } from 'lucide-react';
import { availableAction, availableTrigger } from '../types/types';

export function FlowModal({
	isOpen,
	onClose,
	selectedNode,
	availableItems,
	onSelectItem,
}: {
	isOpen: boolean;
	onClose: () => void;
	selectedNode: 'action' | 'trigger';
	availableItems: availableAction[] | availableTrigger[];
	onSelectItem: (item: availableAction | availableTrigger) => void;
}) {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center'>
			<div className='bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
				<div className='flex items-center justify-between p-4 border-b'>
					<h3 className='text-lg font-semibold text-gray-900'>
						Select{' '}
						{selectedNode === 'action' ? 'Action' : 'Trigger'}
					</h3>
					<button
						onClick={onClose}
						className='p-1 hover:bg-gray-100 rounded-full transition-colors'
					>
						<X className='w-5 h-5 text-gray-500' />
					</button>
				</div>

				<div className='p-4 space-y-4'>
					{availableItems.map((item) => (
						<div
							key={item.id}
							className='flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-100 cursor-pointer'
							onClick={() => onSelectItem(item)}
						>
							<img
								src={item.image}
								alt={item.name}
								className='w-10 h-10 rounded-lg'
							/>
							<div>{item.name}</div>
						</div>
					))}
				</div>

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
