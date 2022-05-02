import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextProgressbar from 'nextjs-progressbar';
import { useLayoutEffect } from 'react';

function App({ Component, pageProps }: AppProps) {
	useLayoutEffect(() => {
		if (localStorage.theme === 'dark') {
			document.documentElement.classList.add('dark');
		}
	}, []);
	return (
		<>
			<NextProgressbar color='#2563eb' />
			<Component {...pageProps} />
		</>
	);
}

export default App;
