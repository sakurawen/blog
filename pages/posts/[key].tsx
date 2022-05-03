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
		fallback: false,
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
				<title>{data.title}</title>
			</Head>
			<span
				className='text-sm group hover:bg-gray-100  text-black transition p-1  rounded mb-6 inline-block cursor-pointer'
				onClick={goBack}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-5 w-5 inline-block mr-1'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					strokeWidth={2}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M11 17l-5-5m0 0l5-5m-5 5h12'
					/>
				</svg>
				wen&apos;s blog
			</span>
			<h1 className='text-4xl leading-sung'>{data.title}</h1>
			<p className='my-6 text-sm text-gray-500'>
				{dayjs(data.create_time).format('YYYY / MM / DD')}
			</p>
			<div className='mb-12'>
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
