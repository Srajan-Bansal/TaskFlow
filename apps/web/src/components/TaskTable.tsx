import { useState } from 'react';
import { Task } from '../types/types';
import { ToggleSwitch } from './ToggleSwitch';
import { HOOKS_URL } from './../config';

export function TaskTable({ tasks }: { tasks: Task[] }) {
	const [toggleEnable, setToggleEnable] = useState<boolean>(false);

	function handleToggle() {
		setToggleEnable(!toggleEnable);
	}

	return (
		<div className='p-8 max-w-screen-lg w-full mx-auto'>
			<div className='flex font-bold'>
				<div className='w-1/5'>Name</div>
				<div className='w-1/5'>Name</div>
				<div className='w-1/5'>Updated At</div>
				<div className='w-[10%]'>Running</div>
				<div className='w-[30%]'>Webhook URL</div>
			</div>
			{tasks.length === 0 ? (
				<div className='py-4'>No tasks found.</div>
			) : (
				tasks.map((task) => (
					<div
						key={task.id}
						className='flex border-b border-t py-4 items-center'
					>
						<div className='w-1/5 flex'>
							<img
								className='w-[30px] h-[30px]'
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
							{new Date(task.updatedAt).toLocaleString()}
						</div>
						<div className='w-[10%]'>
							{/* {task.running ? 'Yes' : 'No'} */}
							<ToggleSwitch
								toggleEnable={toggleEnable}
								onClick={handleToggle}
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
