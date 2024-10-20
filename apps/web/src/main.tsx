import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ContextAPIPRovider } from './Context/ContexrAPI.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ContextAPIPRovider>
			<App />
		</ContextAPIPRovider>
	</StrictMode>
);
