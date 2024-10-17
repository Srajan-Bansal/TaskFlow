import { toast } from 'sonner';

export const showSuccessToast = (message: string) => {
	toast.success(message);
};

export const showErrorToast = (message: string) => {
	toast.error(message);
};

export const showInfoToast = (message: string) => {
	toast(message);
};

export const showWarningToast = (message: string) => {
	toast.warning(message);
};

export const showLoadingToast = (message: string) => {
	return toast.loading(message);
};

export const dismissAllToasts = () => {
	toast.dismiss();
};
