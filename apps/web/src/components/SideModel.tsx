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

	return (
		<>
			<div className='absolute right-0 top-1/2 -translate-y-1/2 h-full w-[400px] p-6 bg-white rounded-lg shadow-lg'>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-semibold'>Node Settings</h2>
					<button onClick={onClose}>
						<X className='w-6 h-6 text-gray-500 hover:text-gray-700' />
					</button>
				</div>

				<div className='space-y-5'>
					<div>
						<h3 className='text-base font-medium text-gray-700'>
							{selectedNodeType === 'trigger'
								? 'Trigger'
								: 'Action'}
						</h3>
						<button
							onClick={() => setIsFlowModalOpen(true)}
							className='text-base text-blue-600 hover:text-blue-700'
						>
							Change
						</button>
						<p className='text-sm text-gray-500 mt-3'>
							{selectedNodeType === 'trigger'
								? 'Configure when this workflow should be triggered'
								: 'Configure what this workflow should do'}
						</p>
					</div>

					<div>
						<h3 className='text-base font-medium text-gray-700'>
							Meta Data
						</h3>
						<div className='mt-3'>
							<label className='text-sm text-gray-500'>
								Workflow Name
							</label>
							<input
								type='text'
								className='mt-2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-base'
							/>
						</div>
						<div className='mt-3'>
							<label className='text-sm text-gray-500'>
								Description
							</label>
							<input
								type='text'
								className='mt-2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-base'
							/>
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
