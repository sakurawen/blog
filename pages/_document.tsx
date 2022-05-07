import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
	return (
		<Html>
			<Head>
				<meta charSet='UTF-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='crossorigin'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
