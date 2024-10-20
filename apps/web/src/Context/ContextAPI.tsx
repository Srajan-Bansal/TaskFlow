import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from 'react';
import { ContextAPIType, UserType } from '../types/types';
import { verifyUser } from '../lib/api';
import { showErrorToast } from '../lib/toaster';

const ContextAPI = createContext<ContextAPIType>({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	user: null,
	setUser: () => {},
	isLoading: true,
});

export const ContextAPIPRovider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [user, setUser] = useState<UserType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		async function checkUser() {
			setIsLoading(true);
			try {
				const res = await verifyUser();

				if (res.ok) {
					setIsAuthenticated(true);
					setUser(res.data);
				} else {
					setIsAuthenticated(false);
					setUser(null);
				}
			} catch (err) {
				setIsAuthenticated(false);
				setUser(null);
				showErrorToast('Error verifying user');
			} finally {
				setIsLoading(false);
			}
		}

		checkUser();
	}, []);

	const value = {
		isAuthenticated,
		setIsAuthenticated,
		user,
		setUser,
		isLoading,
	};

	return <ContextAPI.Provider value={value}>{children}</ContextAPI.Provider>;
};

export const useContextAPI = () => {
	const context = useContext(ContextAPI);
	if (!context) {
		throw new Error(
			'useContextAPI must be used within a ContextAPIProvider'
		);
	}
	return context;
};
