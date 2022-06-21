import type { NextPage } from 'next';
import Head from 'next/head';
import { createContext } from 'react';
const c = createContext({name:"jojo"})

const Resume: NextPage = () => {
	return (
		<div>
			<Head>
				<title>关于</title>
			</Head>
		</div>
	);
};

export default Resume;
