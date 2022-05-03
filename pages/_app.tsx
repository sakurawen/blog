import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextProgressbar from 'nextjs-progressbar';

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<NextProgressbar color='#2563eb' />
			<Component {...pageProps} />
		</>
	);
}

export default App;
