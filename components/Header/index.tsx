import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
	return (
		<div>
			<div className='flex md:flex-row flex-col-reverse justify-between items-center'>
				<div>
					<h1 className='text-4xl md:text-5xl text-center md:text-left font-fusion mt-6 mb-4 font-extrabold leading-normal text-gray-800 '>
						鼠人苦工的博客
					</h1>
					<p className='font-fusion mb-4 text-center md:text-left text-gray-600'>
						日々私たちが过ごしている日常というのは
						<br />
						実は奇迹の连続なのかもしれん。
					</p>
				</div>
				<div className='select-none'>
					<Image
						onDragStart={(e) => e.preventDefault()}
						width={144}
						height={144}
						className='pointer-events-none mr-16 mt-4 select-none rounded-full'
						src='/head.jpg'
						alt=''
					/>
				</div>
			</div>
			<div className='flex justify-center md:justify-start font-fusion space-x-8 md:space-x-6 text-lg text-gray-600'>
				<Link passHref href={'/'}>
					<a className='hover:text-black'>Posts</a>
				</Link>
				<Link passHref href={'/'}>
					<a className='hover:text-black'>Resume</a>
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
