import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
	Navigate,
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Signup } from './pages/Signup';
import { Layout } from './components/Layout';
import { Signin } from './pages/Signin';
import { Dashboard } from './pages/Dashboard';
import { Create } from './pages/Create';
import { useContextAPI } from './Context/ContextAPI';
import { Spinner } from '@repo/ui/Spinner';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
	const { isLoading, isAuthenticated } = useContextAPI();

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				path='/'
				element={<Layout />}
			>
				<Route
					index
					element={<Home />}
				/>
				<Route
					path='sign-up'
					element={
						!isAuthenticated ? (
							<Signup />
						) : (
							<Navigate
								to='/app/home'
								replace
							/>
						)
					}
				/>
				<Route
					path='/app/login'
					element={
						!isAuthenticated ? (
							<Signin />
						) : (
							<Navigate
								to='/app/home'
								replace
							/>
						)
					}
				/>
				<Route
					path='/app/home'
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/app/create'
					element={
						<ProtectedRoute>
							<Create />
						</ProtectedRoute>
					}
				/>
			</Route>
		)
	);

	return (
		<>
			{isLoading && <Spinner />}
			<RouterProvider router={router} />
		</>
	);
};

export default App;
