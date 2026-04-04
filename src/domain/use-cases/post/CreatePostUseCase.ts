import { inject, injectable } from 'inversify';
import { Asset } from 'react-native-image-picker';

import { IPost } from '@domain/models';
import { IFileRepository, IPostRepository, IUserRepository } from '@domain/repositories';

@injectable()
class CreatePostUseCase {
  constructor(
    @inject(IPostRepository.$) private postRepository: IPostRepository,
    @inject(IFileRepository.$) private fileRepository: IFileRepository,
    @inject(IUserRepository.$) private userRepository: IUserRepository,
  ) {}

  async execute(content: string, images: Asset[]): Promise<IPost> {
    let imageUrls: string[] = [];

    if (images.length > 0) {
      const formData = new FormData();

      images.forEach(image => {
        formData.append('image', {
          uri: image.uri,
          name: image.fileName,
          type: image.type,
        });
      });

      const files = await this.fileRepository.postPostImages(formData, {});
      imageUrls = files.map(f => f.url);
    }

    const post = await this.postRepository.createPost({ content, images: imageUrls });

    const cachedPosts = this.postRepository.getLoggedInUserPosts();

    if (cachedPosts) {
      this.postRepository.setLoggedInUserPosts({
        ...cachedPosts,
        meta: { ...cachedPosts.meta, totalItems: cachedPosts.meta.totalItems + 1 },
        results: [post, ...cachedPosts.results],
      });
    }

    const currentUser = this.userRepository.getUserSession();

    if (currentUser) {
      this.userRepository.setUserSession({
        ...currentUser,
        postsCount: currentUser.postsCount + 1,
      });
    }

    return post;
  }
}

export default CreatePostUseCase;
