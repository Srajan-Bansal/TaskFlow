import { X } from 'lucide-react';
import { availableAction, availableTrigger } from '../types/types';

export function FlowModal({
	onClose,
	selectedNode,
	availableItems,
	onSelectItem,
}: {
	onClose: () => void;
	selectedNode: 'action' | 'trigger';
	availableItems: availableAction[] | availableTrigger[];
	onSelectItem: (item: availableAction | availableTrigger) => void;
}) {
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
							onClick={() => {
								onSelectItem(item);
								onClose();
							}}
						>
							<div>{item.name}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
