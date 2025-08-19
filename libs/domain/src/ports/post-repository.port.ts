import { Post } from '../entity/post.entity';

export interface PostRepositoryPort {
  findById(id: string): Promise<Post | undefined>;
  findAll(): Promise<Post[]>;
  create(post: Post): Promise<Post>;
  update(post: Post): Promise<Post>;
  delete(id: string): Promise<void>;
}
