import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from 'react-router-dom';

import { Home } from './pages/Home';
import { Signup } from './pages/Signup';
import { Layout } from './components/Layout';
import { Signin } from './pages/Signin';
import { Dashboard } from './pages/Dashboard';
import { Create } from './pages/Create';

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
					element={<Signin />}
				/>
				<Route
					path='/app/home'
					element={<Dashboard />}
				/>
				<Route
					path='/app/create'
					element={<Create />}
				/>
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
