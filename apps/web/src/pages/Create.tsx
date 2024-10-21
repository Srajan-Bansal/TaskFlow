import { useState, useCallback } from 'react';
import {
	ReactFlow,
	MiniMap,
	Controls,
	Background,
	applyEdgeChanges,
	applyNodeChanges,
	addEdge,
	Handle,
	Position,
	Panel,
	OnNodesChange,
	OnEdgesChange,
	OnConnect,
	DefaultEdgeOptions,
	type Node,
	type Edge,
	BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Workflow, Zap } from 'lucide-react';
import { PrimaryButton } from '@repo/ui/PrimaryButton';
import { TriggerNode, ActionNode } from '../types/types';
import { FlowModal } from '../components/FlowModel';

const triggerNode = ({ data }: TriggerNode) => (
	<div className='bg-yellow-100 p-4 rounded-lg border border-yellow-300'>
		<Handle
			type='source'
			position={Position.Bottom}
		/>
		<div className='flex flex-col items-center'>
			<Zap className='w-4 h-4 mb-2' />
			<div>{data.label}</div>
		</div>
	</div>
);

const actionNode = ({ data }: ActionNode) => (
	<div className='bg-blue-100 p-4 rounded-lg border border-blue-300'>
		<Handle
			type='target'
			position={Position.Top}
		/>
		<Handle
			type='source'
			position={Position.Bottom}
		/>
		<div className='flex flex-col items-center'>
			<Workflow className='w-4 h-4 mb-2' />
			<div>{data.label}</div>
		</div>
	</div>
);

const nodeTypes = {
	trigger: triggerNode,
	action: actionNode,
};

const initialNodes: Node[] = [
	{
		id: '1',
		type: 'trigger',
		position: { x: 250, y: 50 },
		data: { label: 'When new email arrives' },
	},
	{
		id: '2',
		type: 'action',
		position: { x: 250, y: 200 },
		data: { label: 'Send Slack message' },
	},
];

const initialEdges: Edge[] = [
	{ id: 'e1-2', source: '1', target: '2', animated: true },
];

const defaultEdgeOptions: DefaultEdgeOptions = {
	type: 'simplebezier',
	animated: true,
	style: {
		stroke: '#374151',
	},
};

export const Create = () => {
	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>(initialEdges);
	const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
	const [selectedNode, setSelectedNode] = useState<Node | null>(null);

	const onNodesChange: OnNodesChange = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[setNodes]
	);

	const onEdgesChange: OnEdgesChange = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[setEdges]
	);

	const onConnect: OnConnect = useCallback(
		(connection) => setEdges((eds) => addEdge(connection, eds)),
		[setEdges]
	);

	const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
		setSelectedNode(node);
		setIsModelOpen(true);
		// node.style = {
		// 	border: '2px solid rgb(81, 64, 191)',
		// 	borderRadius: '10px',
		// };
		setNodes((nds) => nds.map((n) => (n.id === node.id ? node : n)));
	}, []);

	const addActionNode = useCallback(() => {
		const newNode: Node = {
			id: `action-${nodes.length + 1}`,
			type: 'action',
			position: {
				x: Math.random() * 500,
				y: Math.random() * 300,
			},
			data: { label: 'New Action' },
		};
		setNodes((nds) => [...nds, newNode]);
	}, [nodes]);

	return (
		<div className='w-full h-[800px] relative'>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
				defaultEdgeOptions={defaultEdgeOptions}
				onNodeClick={onNodeClick}
				fitView
				className='bg-slate-50'
				snapToGrid
				snapGrid={[15, 15]}
			>
				<Background
					variant={BackgroundVariant.Dots}
					gap={15}
					size={1}
					color='#374151'
				/>
				<Controls className='absolute top-2 left-2' />
				<MiniMap className='absolute bottom-2 left-2 ml-12 w-[200px]' />

				<Panel
					position='bottom-center'
					className='bg-white p-2 rounded-t-lg shadow-lg'
				>
					<div className='flex gap-2'>
						<PrimaryButton
							onClick={addActionNode}
							className='flex items-center gap-2'
						>
							<Workflow className='w-4 h-4' />
							Add Action
						</PrimaryButton>
					</div>
				</Panel>
				<FlowModal
					isOpen={isModelOpen}
					onClose={() => {
						setIsModelOpen(false);
						setSelectedNode(null);
					}}
					title={(selectedNode?.data.label as string) || 'Edit Node'}
				>
					<div className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Label
							</label>
							<input
								type='text'
								className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
								defaultValue={
									selectedNode?.data.label as string
								}
							/>
						</div>
					</div>
				</FlowModal>
			</ReactFlow>
		</div>
	);
};
