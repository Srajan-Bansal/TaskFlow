import { useState, useEffect } from 'react';
import { getAllTasks } from '../lib/api';
import { Task } from '../types';

export const useTasks = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const data = await getAllTasks();
				setTasks(data);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err);
				} else {
					setError(new Error('An unknown error occurred'));
				}
			} finally {
				setLoading(false);
			}
		};

		fetchTasks();
	}, []);

	return { tasks, loading, error };
};
