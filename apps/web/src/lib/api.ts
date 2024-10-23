import axios from 'axios';
import { BACKEND_URL } from '../config';
import { SignUpUser, SignInUser, Task } from '../types/types';

export const getAllTasks = async () => {
	const res = await axios.get(`${BACKEND_URL}/api/v1/task/getUserTasks`, {
		withCredentials: true,
	});

	return res.data;
};

export const signUp = async ({
	email,
	firstName,
	lastName,
	password,
}: SignUpUser) => {
	const res = await axios.post(
		`${BACKEND_URL}/api/v1/user/signup`,
		{
			email,
			firstName,
			lastName,
			password,
		},
		{ withCredentials: true }
	);
	localStorage.setItem('authToken', res.data.token);

	return res.data;
};

export const signIn = async ({ email, password }: SignInUser) => {
	const res = await axios.post(
		`${BACKEND_URL}/api/v1/user/login`,
		{
			email,
			password,
		},
		{ withCredentials: true }
	);

	return res.data;
};

export const verifyUser = async () => {
	const res = await axios.get(`${BACKEND_URL}/api/v1/user/verify`, {
		withCredentials: true,
	});

	return res.data;
};

export const getAvailableTriggers = async () => {
	const res = await axios.get(
		`${BACKEND_URL}/api/v1/trigger/availableTriggers`,
		{
			withCredentials: true,
		}
	);

	return res.data;
};

export const getAvailableActions = async () => {
	const res = await axios.get(
		`${BACKEND_URL}/api/v1/action/availableActions`,
		{
			withCredentials: true,
		}
	);

	return res.data;
};

export const createTask = async (task: any) => {
	const res = await axios.post(`${BACKEND_URL}/api/v1/task`, task, {
		withCredentials: true,
	});

	return res.data;
};

export const getTask = async (id: string) => {
	const res = await axios.get(`${BACKEND_URL}/api/v1/task/${id}`, {
		withCredentials: true,
	});

	return res.data;
};
