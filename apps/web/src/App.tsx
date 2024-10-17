import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from 'react-router-dom';

import { Home } from './pages/Home';
import { Signup } from './pages/Signup';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

const App = () => {
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
					element={<Signup />}
				/>
				<Route
					path='/app/login'
					element={<Login />}
				/>
				<Route
					path='/app/home'
					element={<Dashboard />}
				/>
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
