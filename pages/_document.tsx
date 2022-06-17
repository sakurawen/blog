import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
	return (
		<Html>
			<Head>
				<meta charSet='UTF-8' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='crossorigin'
				/>
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<link
					href='https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap'
					rel='stylesheet'
				/>
				<meta
					name='keywords'
					content='omazio,鼠人苦工的博客,blog,博客,鼠鼠,鼠人苦工,'
				/>
				<meta name='renderer' content='webkit' />
				<meta name='description' content='鼠人苦工的博客' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
