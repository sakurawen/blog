import type { FC } from 'react';

const Layout: FC<{ children: React.ReactNode }> = (props) => {
	return <div className='max-w-2xl mx-auto pt-24 px-2'>{props.children}</div>;
};

export default Layout;
