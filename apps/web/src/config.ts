import { type Node, type Edge, DefaultEdgeOptions } from '@xyflow/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
const HOOKS_URL = import.meta.env.VITE_HOOKS_URL as string;

const initialNodes: Node[] = [
	{
		id: '1',
		type: 'trigger',
		position: { x: 250, y: 50 },
		data: { label: 'Add Trigger' },
	},
	{
		id: '2',
		type: 'action',
		position: { x: 250, y: 200 },
		data: { label: 'Add Action' },
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

export {
	BACKEND_URL,
	HOOKS_URL,
	initialNodes,
	initialEdges,
	defaultEdgeOptions,
};
