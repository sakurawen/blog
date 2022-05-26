import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { postsService } from 'api/index';
import Layout from 'components/Layout';
import { Posts } from '@types';
import { compiler } from 'markdown-to-jsx';
import dayjs from 'dayjs';
import mdxOverrides from 'components/mdx/mdxOverrides';
import { useRouter } from 'next/router';

export const getStaticPaths: GetStaticPaths = async () => {
	const ret = await postsService.getKeys();
	const keys = ret.data.map((key) => ({
		params: {
			key: key,
		},
	}));
	return {
		paths: keys,
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const key = (ctx.params?.key as string) || '';
	try {
		const ret = await postsService.getDetail(key);

		return {
			props: {
				data: ret.data,
			},
			revalidate: 10,
		};
	} catch {
		return {
			notFound: true,
			props: {
				data: null,
			},
		};
	}
};

/**
 * 文章页
 * @param param0
 * @returns
 */
const Posts: NextPage<{ data: Posts }> = ({ data }) => {
	const router = useRouter();
	const goBack = () => {
		router.push('/');
	};
	return (
		<Layout>
			<Head>
				<title>{data.title} | wen&apos;s Blog</title>
			</Head>
			<span
				className='text-base font-fusion hover:px-2 group font-bold hover:bg-gray-100  text-black transition py-1  rounded mb-8 inline-flex items-center cursor-pointer'
				onClick={goBack}
			>
				<span className='mr-1 w-0 group-hover:w-5 opacity-0 group-hover:opacity-100 transition-all overflow-hidden'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5 inline-block '
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z'
							clipRule='evenodd'
						/>
					</svg>
				</span>
				<span>WEN&apos;S BLOG</span>
			</span>
			<h1 className='text-4xl font-bold  font-fusion leading-sung'>{data.title}</h1>
			<p className='mt-4 font-fusion mb-8 text-sm text-gray-500'>
				{dayjs(data.create_time).format('YYYY / MM / DD')}
			</p>
			<div className='pb-12'>
				{compiler(data.content, {
					wrapper: 'article',
					forceWrapper: true,
					forceBlock: true,
					overrides: mdxOverrides,
				})}
			</div>
		</Layout>
	);
};

export default Posts;
