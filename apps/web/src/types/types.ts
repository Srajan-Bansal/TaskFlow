export type Task = {
	id: number;
	title: string;
	description?: string;
	userId: string;
	actions: {
		id: string;
		taskId: string;
		metadata?: { [key: string]: string };
		sortingOrder: number;
		availableActionId: string;
		availableAction: {
			id: string;
			name: string;
			image: string;
		};
	}[];
	trigger: {
		id: string;
		taskId: string;
		metadata?: { [key: string]: string };
		availableTriggerId: string;
		availableTrigger: {
			id: string;
			name: string;
			image: string;
		};
	};
	updatedAt: string;
	running?: boolean;
};

export type SignUpUser = {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
};

export type SignInUser = {
	email: string;
	password: string;
};

export type TriggerNode = {
	data: {
		label: string;
	};
};

export type ActionNode = {
	data: {
		label: string;
	};
};

export type UserType = {
	firstName: string;
	lastName: string;
	email: string;
};

export type ContextAPIType = {
	isAuthenticated: boolean;
	setIsAuthenticated: (value: boolean) => void;
	user: UserType | null;
	setUser: (value: UserType) => void;
	isLoading: boolean;
};
