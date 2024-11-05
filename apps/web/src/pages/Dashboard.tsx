import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkButton } from '@repo/ui/DarkButton';
import { Spinner } from '@repo/ui/Spinner';
import { useTasks } from '../hooks/useTasks';
import { showErrorToast, showSuccessToast } from '../lib/toaster';
import { Plus } from 'lucide-react';
import { TaskTable } from '../components/TaskTable';
import { deleteTask, toggleTaskRunning } from './../lib/api';
import { Task } from '../types/types';

export const Dashboard = () => {
	const { tasks = [], loading, error, setTasks } = useTasks();
	const navigate = useNavigate();

	useEffect(() => {
		if (error) {
			showErrorToast(error.message);
		}
	}, [error]);

	async function handleDeleteTask(id: string) {
		try {
			await deleteTask(id);
			const updatedTasks = tasks.filter((task) => task.id !== id);
			setTasks(updatedTasks);
			showSuccessToast('Task Deleted successfully');
		} catch (err) {
			showErrorToast('Task Cannot be deleted');
		}
	}

	async function handleUpdateTask(id: string, updates: Partial<Task>) {
		try {
			await toggleTaskRunning(id, updates.Running as boolean);
			const updatedTasks = tasks.map((task) =>
				task.id === id ? { ...task, ...updates } : task
			);
			setTasks(updatedTasks);
			showSuccessToast(`Task is ${updates.Running ? 'Live' : 'Off'} Now`);
		} catch (err) {
			showErrorToast('Please try again later!');
		}
	}

	return (
		<>
			<div className='flex justify-center pt-8'>
				<div className='lg:w-2/3 sm:w-full mx-auto'>
					<div className='flex justify-between mx-8'>
						<div className='text-2xl font-bold text-slate-600'>
							TaskFlow
						</div>
						<DarkButton onClick={() => navigate('/app/create')}>
							<Plus className='mr-2' /> Create
						</DarkButton>
					</div>
				</div>
			</div>
			{loading && <Spinner />}
			{!loading && !error && (
				<TaskTable
					tasks={tasks}
					handleDeleteTask={handleDeleteTask}
					handleToggleTask={handleUpdateTask}
				/>
			)}
		</>
	);
};
