export type Task = {
	id: number;
	title: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	running: boolean;
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
};
