import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import {
	TriggerNode,
	ActionNode,
	availableAction,
	availableTrigger,
} from '../types/types';
import { FlowModal } from '../components/FlowModel';
import { useAvailableActionsAndTriggers } from '../hooks/useAvailableActoinsAndTriggers';
import { createTask, getTask } from '../lib/api';
import { showErrorToast } from '../lib/toaster';

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

const actionNode = ({ data }: { data: ActionNode['data'] }) => (
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
} as const;

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
	const { availableActions, availableTriggers } =
		useAvailableActionsAndTriggers();
	const { id } = useParams();

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

	const handleSelectItem = useCallback(
		(item: availableAction | availableTrigger) => {
			setNodes((nds) =>
				nds.map((node) =>
					node.id === selectedNode?.id
						? {
								...node,
								data: {
									...node.data,
									id: item.id,
									label: item.name,
								},
							}
						: node
				)
			);

			setIsModelOpen(false);
		},
		[selectedNode]
	);

	const publishWorkflow = async () => {
		try {
			const triggerNode = nodes.find((node) => node.type === 'trigger');
			const actionNodes = nodes.filter((node) => node.type === 'action');

			if (!triggerNode || actionNodes.length === 0) {
				showErrorToast(
					'Workflow must have at least one trigger and action.'
				);
				return;
			}

			const task = {
				availableTriggerId: triggerNode.data.id,
				availableTrigger: availableTriggers.find(
					(trigger) => trigger.id === triggerNode.data.id
				),
				actions: actionNodes.map((action, index) => ({
					availableActionId: action.data.id,
					sortingOrder: index,
					actionMetaData: action.data.metadata || {},
				})),
			};

			console.log(task);
			await createTask(task);
		} catch (error) {
			showErrorToast('Failed to create workflow');
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getTask(id as string);
				console.log(res);

				if (res) {
					// Create the trigger node based on the response
					const triggerNode: Node = {
						id: res.triggerId,
						type: 'trigger',
						position: { x: 250, y: 50 },
						data: {
							id: res.trigger.availableTrigger.id,
							label: res.trigger.availableTrigger.name, // Corrected 'nam' to 'name'
						},
					};

					// Create action nodes from the response actions
					const actionNodes: Node[] = res.actions.map(
						(action: ActionNode, index: number) => ({
							id: action.id, // Ensure this is a unique identifier
							type: 'action',
							position: { x: 250, y: 200 + index * 150 }, // Adjust positioning as needed
							data: {
								id: action.availableActionsId,
								label: action.name || 'New Action', // Default label if name is missing
								metadata: action.metadata || {}, // Default to empty object if metadata is missing
							},
						})
					);

					// Create edges connecting trigger and action nodes
					const edges: Edge[] = actionNodes.map((actionNode) => ({
						id: `e-${triggerNode.id}-${actionNode.id}`,
						source: triggerNode.id,
						target: actionNode.id,
						animated: true,
					}));

					// Set the nodes and edges into state
					setNodes([triggerNode, ...actionNodes]);
					setEdges(edges);
				} else {
					showErrorToast('No task data found');
				}
			} catch (error) {
				showErrorToast('Failed to fetch task');
			}
		};
		fetchData();
	}, [id]);

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
					position='top-right'
					className='bg-white p-2 rounded-t-lg shadow-lg'
				>
					<PrimaryButton
						onClick={publishWorkflow}
						className='flex items-center gap-2'
					>
						Publish Workflow
					</PrimaryButton>
				</Panel>

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
					selectedNode={selectedNode?.type as 'action' | 'trigger'}
					availableItems={
						selectedNode?.type === 'action'
							? availableActions
							: availableTriggers
					}
					onSelectItem={handleSelectItem}
				/>
			</ReactFlow>
		</div>
	);
};
