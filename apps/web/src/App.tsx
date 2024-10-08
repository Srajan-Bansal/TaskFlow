import { SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@repo/ui';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route
					path='/'
					element={
						<div>
							Home
							<Button />
						</div>
					}
				/>
				<Route
					path='sign-in'
					element={<SignInButton />}
				/>
				<Route
					path='sign-out'
					element={<SignedOut />}
				/>
				<Route
					path='user'
					element={<UserButton />}
				/>
			</>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
