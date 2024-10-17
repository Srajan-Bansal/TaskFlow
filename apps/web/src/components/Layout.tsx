import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Toaster } from 'sonner';

export const Layout = () => {
	return (
		<div>
			<Toaster
				position='top-center'
				richColors
			/>
			<Header />
			<main>
				<Outlet />
			</main>
		</div>
	);
};
