import { Post, PostRepositoryPort } from '@explorer/domain';

export class InMemoryPostRepository implements PostRepositoryPort {
  private posts: Post[] = [
    {
      id: '1',
      title: 'Hexagonal Architecture',
      content: 'A design pattern...',
      authorId: 'user1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'tRPC with Express',
      content: 'A guide to...',
      authorId: 'user2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findAll(): Promise<Post[]> {
    return this.posts;
  }

  async findById(id: string): Promise<Post | undefined> {
    return this.posts.find((post) => post.id === id);
  }

  async create(post: Post): Promise<Post> {
    this.posts.push(post);
    return post;
  }

  async update(post: Post): Promise<Post> {
    const index = this.posts.findIndex((p) => p.id === post.id);
    if (index !== -1) {
      this.posts[index] = post;
    }
    return post;
  }

  async delete(id: string): Promise<void> {
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
