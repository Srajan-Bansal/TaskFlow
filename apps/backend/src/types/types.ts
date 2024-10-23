import { Request } from 'express';

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
	metaData?: JSON;
	actions: {
		availableActionId: string;
		metaData?: JSON;
	}[];
};

export interface AuthenticatedRequest extends Request {
	user?: UserProfile;
}

export default ErrorResponse;
