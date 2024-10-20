import { Navigate } from 'react-router-dom';
import { useContextAPI } from '../Context/ContextAPI';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, isLoading } = useContextAPI();

	if (isLoading) return null;

	if (!isAuthenticated) {
		return (
			<Navigate
				to='/app/login'
				replace
			/>
		);
	}

	return <>{children}</>;
};

export default ProtectedRoute;
