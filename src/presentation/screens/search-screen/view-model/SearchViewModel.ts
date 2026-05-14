import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import Toast from 'react-native-toast-message';

import { mergeArraysWithoutDuplicates } from '@core/helpers';
import { IMeta, IPost, IUser } from '@domain/models';
import { PostUseCases, UserUseCases } from '@domain/use-cases';
import SearchPostsUseCase from '@domain/use-cases/post/SearchPostsUseCase';
import SearchUsersUseCase from '@domain/use-cases/user/SearchUsersUseCase';

import { ISearchViewModel, SearchMode } from './ISearchViewModel';

@injectable()
class SearchViewModel implements ISearchViewModel {
  private _posts: IPost[] = [];
  private _postsMeta: IMeta | null = null;
  private _users: IUser[] = [];
  private _usersMeta: IMeta | null = null;
  private _isLoading = false;

  constructor(
    @inject(PostUseCases.$SearchPosts) private searchPostsUseCase: SearchPostsUseCase,
    @inject(UserUseCases.$SearchUsers) private searchUsersUseCase: SearchUsersUseCase,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get posts() {
    return this._posts;
  }

  get postsMeta() {
    return this._postsMeta;
  }

  get users() {
    return this._users;
  }

  get usersMeta() {
    return this._usersMeta;
  }

  get isLoading() {
    return this._isLoading;
  }

  async getPosts({ page = 1, mode }: { page?: number; mode: SearchMode }) {
    this._isLoading = true;
    try {
      const { results, meta } = await this.searchPostsUseCase.execute({ page, perPage: 20 });
      this._posts =
        mode === 'pagination' ? mergeArraysWithoutDuplicates(this._posts, results, 'id') : results;
      this._postsMeta = meta;
    } catch {
      Toast.show({ type: 'error', text1: 'Не удалось загрузить посты' });
    } finally {
      this._isLoading = false;
    }
  }

  async getUsers({ page = 1, mode }: { page?: number; mode: SearchMode }) {
    this._isLoading = true;
    try {
      const { results, meta } = await this.searchUsersUseCase.execute({ page, perPage: 20 });
      this._users =
        mode === 'pagination' ? mergeArraysWithoutDuplicates(this._users, results, 'id') : results;
      this._usersMeta = meta;
    } catch {
      Toast.show({ type: 'error', text1: 'Не удалось загрузить пользователей' });
    } finally {
      this._isLoading = false;
    }
  }
}

export default SearchViewModel;
