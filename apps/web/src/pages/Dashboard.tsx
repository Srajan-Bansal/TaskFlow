import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkButton } from '@repo/ui/DarkButton';
import { Spinner } from '@repo/ui/Spinner';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../types/types';
import { showErrorToast } from '../lib/toaster';
import { HOOKS_URL } from './../config';
import { Plus } from 'lucide-react';

export const Dashboard = () => {
	const { tasks, loading, error } = useTasks();
	const navigate = useNavigate();

	useEffect(() => {
		if (error) {
			showErrorToast(error.message);
		}
	}, [error]);

	return (
		<div>
			<div className='flex justify-center pt-8'>
				<div className='max-w-screen-lg w-full'>
					<div className='flex justify-between'>
						<div className='text-2xl font-bold text-slate-600'>
							TaskFlow
						</div>
						<DarkButton
							onClick={() => {
								navigate('task/create');
							}}
						>
							<Plus className='mr-2' /> Create
						</DarkButton>
					</div>
				</div>
			</div>
			{loading && <Spinner />}
			{!loading && !error && <TaskTable tasks={tasks} />}
		</div>
	);
};

function TaskTable({ tasks }: { tasks: Task[] }) {
	return (
		<div className='p-8 max-w-screen-lg mx-auto'>
			<div className='flex font-bold'>
				<div className='flex-1'>Name</div>
				<div className='flex-1'>ID</div>
				<div className='flex-1'>Created At</div>
				<div className='flex-1'>Running</div>
				<div className='flex-1'>Webhook URL</div>
			</div>
			{tasks.length === 0 ? (
				<div className='py-4'>No tasks found.</div>
			) : (
				tasks.map((task) => (
					<div
						key={task.id}
						className='flex py-2 border-b'
					>
						<div className='flex-1'>{task.title}</div>
						<div className='flex-1'>{task.id}</div>
						<div className='flex-1'>
							{new Date(task.createdAt).toLocaleString()}
						</div>
						<div className='flex-1'>
							{task.running ? 'Yes' : 'No'}
						</div>
						<div className='flex-1'>{`${HOOKS_URL}/hooks/catch/1/${task.id}`}</div>
					</div>
				))
			)}
		</div>
	);
}
