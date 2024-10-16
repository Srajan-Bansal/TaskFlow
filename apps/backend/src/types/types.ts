type ErrorResponse = {
	message: string;
	statusCode: number;
};

export type UserProfile = {
	id: string;
	FirstName?: string;
	LastName?: string;
	email?: string;
};

export type TaskCreateSchema = {
	title?: string;
	availableTriggerId: string;
	triggerMetaData?: JSON;
	actions: {
		availableActionId: string;
		actionMetaData?: JSON;
	}[];
};

export default ErrorResponse;
