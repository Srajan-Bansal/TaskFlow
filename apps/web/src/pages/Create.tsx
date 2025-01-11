import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
	OnNodesChange,
	OnEdgesChange,
	OnConnect,
	type Node,
	type Edge,
	BackgroundVariant,
	Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Spinner } from '@repo/ui/Spinner';
import { Workflow, Zap } from 'lucide-react';
import { PrimaryButton } from '@repo/ui/PrimaryButton';
import {
	TriggerNode,
	ActionNode,
	availableAction,
	availableTrigger,
	NodeConnection,
	App,
} from '../types/types';
import { SideModel } from '../components/SideModel';
import { createTask, getTask, updateTask, fetchApps } from '../lib/api';
import { showErrorToast } from '../lib/toaster';
import { initialNodes, initialEdges, defaultEdgeOptions } from '../config';

const triggerNode = ({ data }: { data: TriggerNode['data'] }) => (
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
export const Create = () => {
	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>(initialEdges);
	const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
	const [selectedNode, setSelectedNode] = useState<Node | null>(null);
	const [nodeConnectionsMap, setNodeConnectionsMap] =
		useState<NodeConnection>({});
	const [apps, setApps] = useState<App[]>([]);
	const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
	const [isInitialLoading, setIsInitialLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	const { id } = useParams();
	const navigate = useNavigate();

	const onNodesChange: OnNodesChange = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[setNodes]
	);

	const onEdgesChange: OnEdgesChange = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[setEdges]
	);

	const onConnect: OnConnect = useCallback(
		(params: Connection) => {
			const { source, target } = params;
			if (!source || !target) return;

			setNodeConnectionsMap((prev) => ({
				...prev,
				[source]: prev[source] || { incoming: 0, outgoing: 0 },
				[target]: prev[target] || { incoming: 0, outgoing: 0 },
			}));

			if (
				nodeConnectionsMap[source]?.outgoing >= 1 ||
				nodeConnectionsMap[target]?.incoming >= 1
			) {
				showErrorToast('Each node can only have 1 parent and 1 child');
				return;
			}

			setNodeConnectionsMap((prev) => ({
				...prev,
				[source]: {
					...prev[source],
					outgoing: (prev[source]?.outgoing || 0) + 1,
				},
				[target]: {
					...prev[target],
					incoming: (prev[target]?.incoming || 0) + 1,
				},
			}));

			setEdges((eds) => addEdge(params, eds));
		},
		[nodeConnectionsMap]
	);

	const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
		setSelectedNode(node);
		setIsModelOpen(true);
	}, []);

	const addActionNode = useCallback(() => {
		const newActionNode: Node = {
			id: `action-${nodes.length + 1}`,
			type: 'action',
			position: {
				x: nodes[nodes.length - 1].position.x,
				y: nodes[nodes.length - 1].position.y + 150,
			},
			data: { label: 'New Action' },
		};

		setNodes((nds) => [...nds, newActionNode]);
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
		},
		[selectedNode]
	);

	const publishWorkflow = async () => {
		try {
			setIsSaving(true);
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
				triggerMetaData: triggerNode.data.metadata || {},
				actions: actionNodes.map((action, index) => ({
					availableActionId: action.data.id,
					sortingOrder: index,
					actionMetaData: action.data.metadata || {},
				})),
			};

			if (id) {
				await updateTask(id, task);
			} else {
				await createTask(task);
			}
			navigate('/app/home');
		} catch (error) {
			showErrorToast('Failed to create workflow');
		} finally {
			setIsSaving(false);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setIsInitialLoading(true);
			try {
				const [taskData, availableApps] = await Promise.all([
					id ? getTask(id) : null,
					fetchApps(),
				]);

				setApps(availableApps);

				if (taskData) {
					const triggerNode: Node = {
						id: taskData.triggerId,
						type: 'trigger',
						position: { x: 250, y: 50 },
						data: {
							id: taskData.trigger.availableTrigger.id,
							label: taskData.trigger.availableTrigger.name,
						},
					};

					const actionNodes: Node[] = taskData.actions.map(
						(action: any, index: number) => ({
							id: action.id,
							type: 'action',
							position: { x: 250, y: 200 + index * 150 },
							data: {
								id: action.availableActionsId,
								label: action.availableAction.name,
								metadata: action.metadata || {},
							},
						})
					);

					const edges: Edge[] = actionNodes.map(
						(actionNode, index) => ({
							id:
								index === 0
									? `e-${triggerNode.id}-${actionNode.id}`
									: `e-${actionNodes[index - 1].id}-${actionNode.id}`,
							source:
								index === 0
									? triggerNode.id
									: actionNodes[index - 1].id,
							target: actionNode.id,
							animated: true,
						})
					);

					setNodes([triggerNode, ...actionNodes]);
					setEdges(edges);
				}
			} catch (error) {
				showErrorToast('Failed to fetch data');
			} finally {
				setIsInitialLoading(false);
			}
		};

		fetchData();
	}, [id]);

	if (isInitialLoading) {
		return (
			<div className='w-full h-[700px] flex items-center justify-center'>
				<Spinner size='lg' />
			</div>
		);
	}

	return (
		<div className='w-full h-[700px] relative'>
			<div className='bg-slate-100 p-2 rounded-t-lg shadow-lg flex mx-4 gap-5'>
				<div className='flex gap-2'>
					<PrimaryButton
						onClick={addActionNode}
						className='flex items-center gap-2'
						disabled={isSaving}
					>
						<Workflow className='w-4 h-4' />
						Add Action
					</PrimaryButton>
				</div>

				<div className='flex gap-2'>
					<PrimaryButton
						onClick={publishWorkflow}
						className='flex items-center gap-2'
						disabled={isSaving}
					>
						{isSaving ? (
							<div className='flex items-center gap-2'>
								<Spinner size='sm' />
								Publishing...
							</div>
						) : (
							'Publish Workflow'
						)}
					</PrimaryButton>
				</div>
			</div>

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
			</ReactFlow>

			<SideModel
				isOpen={isModelOpen}
				onClose={() => {
					setIsModelOpen(false);
					setSelectedNode(null);
				}}
				selectedNode={selectedNode}
				onSelectItem={handleSelectItem}
				apps={apps}
				selectedAppId={selectedAppId}
				setSelectedAppId={setSelectedAppId}
			/>
		</div>
	);
};
