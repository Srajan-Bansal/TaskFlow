import { useNavigate } from 'react-router-dom';
import { Task } from '../types/types';
import { ToggleSwitch } from './ToggleSwitch';
import { HOOKS_URL } from './../config';
import { Trash2 } from 'lucide-react';

export function TaskTable({
	tasks,
	handleDeleteTask,
	handleToggleTask,
}: {
	tasks: Task[];
	handleDeleteTask: (id: string) => void;
	handleToggleTask: (id: string, updates: Partial<Task>) => void;
}) {
	const navigate = useNavigate();

	function handleToggle(task: Task) {
		handleToggleTask(task.id, { Running: !task.Running });
	}

	return (
		<div className='p-8 max-w-screen-lg w-full mx-auto'>
			<div className='flex font-bold'>
				<div className='w-1/5'>Delete</div>
				<div className='w-1/5'>Name</div>
				<div className='w-1/5'>Name</div>
				<div className='w-1/5'>Last Runned At</div>
				<div className='w-[10%]'>Running</div>
				<div className='w-[30%]'>Webhook URL</div>
			</div>
			{tasks.length === 0 ? (
				<div className='py-4'>No tasks found.</div>
			) : (
				tasks.map((task) => (
					<div
						key={task.id}
						className='flex border-b border-t py-4 items-center cursor-pointer hover:bg-gray-100'
						onClick={() => navigate(`/app/task/${task.id}`)}
					>
						<div className='w-1/5'>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleDeleteTask(task.id);
								}}
								className='text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50'
							>
								<Trash2 className='w-5 h-5' />
							</button>
						</div>
						<div className='w-1/5 flex'>
							<img
								className='w-6 h-6 rounded-lg'
								key={task.id}
								src={task.trigger.availableTrigger.image}
								alt={task.trigger.availableTrigger.name}
							/>
							{task.actions.map((x) => (
								<img
									key={x.id}
									src={x.availableAction.image}
									alt={x.availableAction.name}
									className='w-[30px] h-[30px]'
								/>
							))}
						</div>
						<div className='w-1/5 truncate'>{task.title}</div>
						<div className='w-1/5 truncate'>
							{task.LastRunnedAt
								? task.LastRunnedAt.toLocaleString()
								: 'No run'}
						</div>
						<div className='w-[10%]'>
							<ToggleSwitch
								toggleEnable={task.Running}
								onClick={(e) => {
									e.stopPropagation();
									handleToggle(task);
								}}
							/>
						</div>
						<div className='w-[30%] truncate hover:text-clip hover:overflow-visible'>
							{`${HOOKS_URL}${task.userId}/${task.id}`}
						</div>
					</div>
				))
			)}
		</div>
	);
}
