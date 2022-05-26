import Link from 'next/link';

const Header = () => {
	return (
		<div>
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-5xl font-fusion mt-6 mb-2 font-extrabold leading-normal text-gray-800 '>
						心酸小温的博客
					</h1>
					<p className='font-fusion mb-4 text-gray-600'>
						日々私たちが过ごしている日常というのは
						<br />
						実は奇迹の连続なのかもしれん。
					</p>
				</div>
				<img
					onDragStart={(e) => e.preventDefault()}
					className='pointer-events-none mr-16 mt-4 select-none sm:block hidden rounded-full  w-32 h-32'
					src='head.jpg'
					alt=''
				/>
			</div>
			<div className='flex font-fusion gap-4  text-lg text-gray-600'>
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
