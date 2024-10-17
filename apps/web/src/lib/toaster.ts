import { toast } from 'sonner';

type ToastOptions = {
	duration?: number;
	position?:
		| 'top-center'
		| 'top-right'
		| 'top-left'
		| 'bottom-center'
		| 'bottom-right'
		| 'bottom-left';
	important?: boolean;
	description?: string;
};

export const showSuccessToast = (message: string, options?: ToastOptions) => {
	toast.success(message, options);
};

export const showErrorToast = (message: string, options?: ToastOptions) => {
	toast.error(message, options);
};

export const showInfoToast = (message: string, options?: ToastOptions) => {
	toast(message, options);
};

export const showWarningToast = (message: string, options?: ToastOptions) => {
	toast.warning(message, options);
};

export const showLoadingToast = (message: string, options?: ToastOptions) => {
	return toast.loading(message, options);
};

export const showPromiseToast = <T>(
	promise: Promise<T>,
	{
		loading = 'Loading...',
		success = 'Operation successful!',
		error = 'Operation failed!',
	} = {}
) => {
	return toast.promise(promise, {
		loading,
		success,
		error,
	});
};

export const dismissAllToasts = () => {
	toast.dismiss();
};

export const TOAST_MESSAGES = {
	AUTH: {
		LOGIN_SUCCESS: 'Successfully logged in!',
		LOGIN_ERROR: 'Sign-in failed. Please try again.',
		LOGOUT_SUCCESS: 'Successfully logged out!',
	},
	FORM: {
		SAVE_SUCCESS: 'Changes saved successfully!',
		SAVE_ERROR: 'Failed to save changes.',
	},
} as const;
