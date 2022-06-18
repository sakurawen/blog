import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { postsService } from 'api/index';
import Layout from 'components/Layout';
import { Posts } from '@types';
import { compiler } from 'markdown-to-jsx';
import dayjs from 'dayjs';
import mdxOverrides from 'components/mdx/mdxOverrides';
import { useRouter } from 'next/router';
import Giscus from '@giscus/react';

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
				<title>{data.title} | 鼠人苦工的博客</title>
			</Head>
			<span
				className='text-base font-fusion hover:px-2 group font-bold hover:bg-gray-100  text-black transition py-1  rounded mb-8 inline-flex items-center cursor-pointer'
				onClick={goBack}
			>
				<span className='mr-1 w-0 group-hover:w-5 opacity-0 group-hover:opacity-100 transition-all overflow-hidden'>
					<svg
						className='h-5 w-5 inline-block'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
						role='img'
						width='1em'
						height='1em'
						preserveAspectRatio='xMidYMid meet'
						viewBox='0 0 24 24'
					>
						<path
							fill='currentColor'
							d='M20 11v2H8v2H6v-2H4v-2h2V9h2v2h12zM10 7H8v2h2V7zm0 0h2V5h-2v2zm0 10H8v-2h2v2zm0 0h2v2h-2v-2z'
						/>
					</svg>
				</span>
				<span>.. /</span>
			</span>
			<h1 className='text-4xl font-bold  font-fusion leading-sung'>
				{data.title}
			</h1>
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
			<div className='mb-20'>
				<Giscus
					repo='sakurawen/blog-comments'
					repoId='R_kgDOHhXNkw'
					category='comments'
					categoryId='DIC_kwDOHhXNk84CPvWs'
					mapping='url'
					reactionsEnabled='1'
					emitMetadata='0'
					inputPosition='bottom'
					theme='light_tritanopia'
					lang='zh-CN'
				/>
			</div>
		</Layout>
	);
};

export default Posts;
