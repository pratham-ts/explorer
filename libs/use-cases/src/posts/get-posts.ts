import { Post, PostRepositoryPort } from '@explorer/domain';

export class GetPostsUseCase {
  constructor(private postRepository: PostRepositoryPort) {}

  async execute(): Promise<Post[]> {
    return this.postRepository.findAll();
  }
}
