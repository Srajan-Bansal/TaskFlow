import { useState, useCallback } from 'react';
import { App, availableAction, availableTrigger } from '../types/types';
import { actionsForApp, triggersForApp } from '../lib/api';
import { showErrorToast } from '../lib/toaster';

export const useAppData = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [availableActions, setAvailableActions] = useState<availableAction[]>(
		[]
	);
	const [availableTriggers, setAvailableTriggers] = useState<
		availableTrigger[]
	>([]);

	const fetchAppItems = useCallback(
		async (appId: string, type: 'action' | 'trigger') => {
			setIsLoading(true);
			try {
				if (type === 'action') {
					const actions = await actionsForApp(appId);
					setAvailableActions(actions);
					return actions;
				} else {
					const triggers = await triggersForApp(appId);
					setAvailableTriggers(triggers);
					return triggers;
				}
			} catch (error) {
				showErrorToast('Failed to fetch app items');
				return [];
			} finally {
				setIsLoading(false);
			}
		},
		[]
	);

	return {
		isLoading,
		availableActions,
		availableTriggers,
		fetchAppItems,
	};
};
