import Posts from '@/components/posts';
import { getPosts } from '@/lib/posts';

// If the app uses the page router (not the file-based), we can add static and dynamic metadata using the <Head> component from Nextjs

export const metadata = {
  title: 'All Posts',
  description: 'Browse our all posts'
};

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
