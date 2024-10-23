import { useState, useEffect } from 'react';
import { getAvailableTriggers, getAvailableActions } from './../lib/api';
import { availableAction, availableTrigger } from '../types/types';

export const useAvailableActionsAndTriggers = () => {
	const [availableActions, setAvailableActions] = useState<availableAction[]>(
		[]
	);
	const [availableTriggers, setAvailableTriggers] = useState<
		availableTrigger[]
	>([]);

	useEffect(() => {
		const fetchData = async () => {
			const [actionData, triggerData] = await Promise.all([
				getAvailableActions(),
				getAvailableTriggers(),
			]);
			setAvailableActions(actionData);
			setAvailableTriggers(triggerData);
		};

		fetchData();
	}, []);

	return { availableActions, availableTriggers };
};
