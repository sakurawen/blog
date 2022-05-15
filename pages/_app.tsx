import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextProgressbar from 'nextjs-progressbar';
import { motion, AnimatePresence } from 'framer-motion';

function App({ Component, pageProps, router }: AppProps) {
	return (
		<>
			<NextProgressbar color='#2563eb' />
			<AnimatePresence initial={true}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					key={router.route}
				>
					<Component {...pageProps} />
				</motion.div>
			</AnimatePresence>
		</>
	);
}

export default App;
