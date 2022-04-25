import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { postsService } from 'api/index';
import Layout from 'components/Layout';
import { Posts } from '@types';
import { compiler } from 'markdown-to-jsx';
import dayjs from 'dayjs';
import mdxOverrides from 'components/mdx/mdxOverrides';

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
	return (
		<Layout>
			<Head>
				<title>{data.title}</title>
			</Head>
			<h1 className='text-4xl font-bold'>{data.title}</h1>
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
