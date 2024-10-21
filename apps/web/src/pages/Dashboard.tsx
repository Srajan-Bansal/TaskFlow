import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkButton } from '@repo/ui/DarkButton';
import { Spinner } from '@repo/ui/Spinner';
import { useTasks } from '../hooks/useTasks';
import { showErrorToast } from '../lib/toaster';
import { Plus } from 'lucide-react';
import { TaskTable } from '../components/TaskTable';

export const Dashboard = () => {
	const { tasks = [], loading, error } = useTasks();
	const navigate = useNavigate();

	useEffect(() => {
		if (error) {
			showErrorToast(error.message);
		}
	}, [error]);

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
			{!loading && !error && <TaskTable tasks={tasks} />}
		</>
	);
};
