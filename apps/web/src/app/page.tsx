'use client';

import { trpc } from './utils/trpc';

export default function Index() {
  const posts = trpc.posts.list.useQuery();
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.data?.map((post) => (
          <li key={post.id}>
            {post.title} - {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
