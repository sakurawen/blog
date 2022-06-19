import type { FC } from 'react';

const Layout: FC<{ children: React.ReactNode }> = (props) => {
	return (
		<div className='min-h-screen bg-white transition-colors'>
			<div className='max-w-2xl mx-auto sm:pt-24 pt-12 px-4 overflow-x-hidden'>{props.children}</div>
		</div>
	);
};

export default Layout;
