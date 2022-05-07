import Link from 'next/link';

const Header = () => {
	return (
		<div>
			<h1 className='text-6xl my-6 font-bold leading-normal text-gray-800 '>
				井底之蛙的
				<br />
				<span
					className='text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 via-blue-400 to-sky-400 sky-blur'
				>
					一片天空
				</span>
			</h1>
			<div className='flex gap-4 text-sm text-gray-600'>
				<Link passHref href={'/'}>
					<a className='hover:text-black'>Posts</a>
				</Link>
				<Link passHref href={'/'}>
					<a className='hover:text-black'>About</a>
				</Link>
				<a
					className='hover:text-black'
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

export default Header;
