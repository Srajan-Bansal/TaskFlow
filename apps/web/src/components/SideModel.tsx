import { useState } from 'react';
import { X } from 'lucide-react';
import { FlowModal } from './FlowModel';
import { useAvailableActionsAndTriggers } from '../hooks/useAvailableActoinsAndTriggers';
import { type Node } from '@xyflow/react';
import { availableAction, availableTrigger } from '../types/types';

export function SideModel({
	isOpen,
	onClose,
	selectedNode,
	onSelectItem,
}: {
	isOpen: boolean;
	onClose: () => void;
	selectedNode: Node | null;
	onSelectItem: (item: availableAction | availableTrigger) => void;
}) {
	const [isFlowModalOpen, setIsFlowModalOpen] = useState(false);
	const { availableActions, availableTriggers } =
		useAvailableActionsAndTriggers();
	const selectedNodeType = selectedNode?.type;

	if (!isOpen) return null;
	console.log('isModelOpen', isOpen);

	return (
		<>
			<div className='fixed right-0 top-0 w-150 h-full bg-white shadow-lg p-'>
				<div className='flex justify-between items-center my-4'>
					<h2 className='text-lg font-semibold mx-4'>
						Node Settings
					</h2>
					<button
						onClick={onClose}
						className='p-1 hover:bg-gray-100 rounded-full'
					>
						<X className='w-5 h-5' />
					</button>
				</div>

				<div className='space-y-4'>
					<div className='p-4 border rounded-lg'>
						<div className='flex justify-between items-center mb-3'>
							<h3 className='font-medium'>
								{selectedNodeType === 'trigger'
									? 'Trigger'
									: 'Action'}
							</h3>
							<button
								onClick={() => {
									setIsFlowModalOpen(true);
								}}
								className='text-sm text-blue-600 hover:text-blue-700'
							>
								Change
							</button>
						</div>
						<div className='text-sm text-gray-600'>
							{selectedNodeType === 'trigger'
								? 'Configure when this workflow should be triggered'
								: 'Configure what this workflow should do'}
						</div>
					</div>

					<div className='p-4 border rounded-lg'>
						<h3 className='font-medium mb-3'>Meta Data</h3>
						<div className='space-y-3'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Workflow Name
								</label>
								<input
									type='text'
									className='w-full p-2 border rounded-md'
									placeholder='Enter workflow name'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Description
								</label>
								<textarea
									className='w-full p-2 border rounded-md'
									rows={3}
									placeholder='Enter workflow description'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{isFlowModalOpen && (
				<FlowModal
					onClose={() => setIsFlowModalOpen(false)}
					selectedNode={selectedNodeType as 'action' | 'trigger'}
					availableItems={
						selectedNodeType === 'action'
							? availableActions
							: availableTriggers
					}
					onSelectItem={onSelectItem}
				/>
			)}
		</>
	);
}
