export type Task = {
	id: string;
	title: string;
	description?: string;
	userId?: string;
	actions: {
		id: string;
		taskId: string;
		metadata?: { [key: string]: string };
		sortingOrder: number;
		availableActionId: string;
		availableAction: availableAction;
	}[];
	trigger: {
		id: string;
		taskId: string;
		metadata?: { [key: string]: string };
		availableTriggerId: string;
		availableTrigger: availableTrigger;
	};
	LastRunnedAt?: Date;
	Running: boolean;
};

export type availableAction = {
	id: string;
	name: string;
	image: string;
};

export type availableTrigger = {
	id: string;
	name: string;
	image: string;
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
	id: string;
	availableTriggersId: string;
	availableTrigger: availableTrigger;
	metadata?: { [key: string]: string };
	data: {
		id: string;
		label: string;
		metadata?: { [key: string]: string };
	};
};

export type ActionNode = {
	id: string;
	availableActionsId: string;
	availableAction: availableAction;
	name: string;
	metadata?: { [key: string]: string };
	data: {
		id: string;
		label: string;
		metadata?: { [key: string]: string };
	};
};

export type NodeConnection = {
	[key: string]: {
		incoming: number;
		outgoing: number;
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
