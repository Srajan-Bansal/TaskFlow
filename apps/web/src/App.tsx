import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from 'react-router-dom';

import { Home } from './pages/Home';
import { SignUp } from './pages/Signup';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';

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
					element={<SignUp />}
				/>
				<Route
					path='/app/login'
					element={<Login />}
				/>
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
