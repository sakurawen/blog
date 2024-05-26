import * as sanityService from '~/service/sanity-service';
import * as githubService from '~/service/github-service';
import { Header } from '~/components/header';
import Link from 'next/link';
import { HoverCard } from '~/components/hover-card';
import dayjs from 'dayjs';
/**
 * 首页
 * @returns
 */
export default async function HomePage() {
  const [posts, projects] = await Promise.all([sanityService.getPostsList(), githubService.getPinnedProject()]);
  return (
    <div className='max-w-2xl mx-auto space-y-2 min-h-screen'>
      <section>
        <Header />
      </section>
      <section className=' p-2 md:p-0'>
        <h2 className='text-3xl font-bold uppercase'>Project</h2>
        <ul className='space-y-1 '>
          {projects.data.user.pinnedItems.edges.map((item) => {
            const project = item.node;
            return (
              <li
                className='py-1'
                key={project.name}>
                <HoverCard>
                  <Link
                    className='text-lg'
                    href={project.url}
                    target='_blank'>
                    {project.name}
                  </Link>
                  <p className='text-xs text-zinc-400'>{project.description}</p>
                </HoverCard>
              </li>
            );
          })}
        </ul>
      </section>
      <section className=' p-2 md:p-0'>
        <h2 className='text-3xl font-bold uppercase'>Blog</h2>
        <ul className='space-y-1 '>
          {posts.map((post) => {
            return (
              <li
                className='py-1'
                key={post._id}>
                <HoverCard>
                  <Link
                    className='text-lg'
                    href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                  <p className='text-zinc-400 text-xs'>{post.description}</p>
                  <p className='text-zinc-400 text-xs'>{dayjs(post.publishedAt).format('YYYY/MM/DD')}</p>
                </HoverCard>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
