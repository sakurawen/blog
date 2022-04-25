import Link from 'next/link';

const Navbar = () => {
	return (
		<div>
			<h1 className='text-6xl my-6 font-bold leading-normal text-gray-800'>
				井底之蛙的
				<br />
				<span className='text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 via-blue-400 to-sky-400'>
					一片天空
				</span>
			</h1>
			<div className='flex gap-4 text-sm text-gray-600'>
				<Link passHref href={'/'}>
					<a className='hover:text-gray-900 hover:bg-gray-100 py-1 px-2 rounded'>
						Posts
					</a>
				</Link>
				<Link passHref href={'/'}>
					<a className='hover:text-gray-900 hover:bg-gray-100 py-1 px-2 rounded'>
						About
					</a>
				</Link>
				<a
					className='hover:text-gray-900 hover:bg-gray-100 py-1 px-2 rounded'
					href='https://github.com/sakurawen'
					target='_blank'
					rel='noreferrer'
				>
					Github
				</a>
			</div>
		</div>
	);
};

export default Navbar;
