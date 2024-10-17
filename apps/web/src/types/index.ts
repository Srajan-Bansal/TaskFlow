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
