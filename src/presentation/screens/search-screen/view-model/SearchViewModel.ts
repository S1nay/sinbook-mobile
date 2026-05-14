import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import Toast from 'react-native-toast-message';

import { mergeArraysWithoutDuplicates } from '@core/helpers';
import { IHttpError } from '@core/interfaces/http';
import { IMeta, IPagination, IPost, IUser } from '@domain/models';
import { PostUseCases, UserUseCases } from '@domain/use-cases';
import SearchPostsUseCase from '@domain/use-cases/post/SearchPostsUseCase';
import SearchUsersUseCase from '@domain/use-cases/user/SearchUsersUseCase';
import { Toasts } from '@ui/toast';

import { ISearchViewModel } from './ISearchViewModel';

@injectable()
class SearchViewModel implements ISearchViewModel {
  private _posts: IPost[] = [];
  private _postsMeta: IMeta | null = null;
  private _users: IUser[] = [];
  private _usersMeta: IMeta | null = null;
  private _isPostsLoading: boolean = false;
  private _isUsersLoading: boolean = false;
  private _isPostsRefreshing: boolean = false;
  private _isUsersRefreshing: boolean = false;

  constructor(
    @inject(PostUseCases.$SearchPosts) private searchPostsUseCase: SearchPostsUseCase,
    @inject(UserUseCases.$SearchUsers) private searchUsersUseCase: SearchUsersUseCase,
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get posts(): IPost[] {
    return this._posts;
  }

  get postsMeta(): IMeta | null {
    return this._postsMeta;
  }

  get users(): IUser[] {
    return this._users;
  }

  get usersMeta(): IMeta | null {
    return this._usersMeta;
  }

  get isPostsLoading(): boolean {
    return this._isPostsLoading;
  }

  get isUsersLoading(): boolean {
    return this._isUsersLoading;
  }

  get isPostsRefreshing(): boolean {
    return this._isPostsRefreshing;
  }

  get isUsersRefreshing(): boolean {
    return this._isUsersRefreshing;
  }

  private set posts(value: IPost[]) {
    this._posts = value;
  }

  private set postsMeta(value: IMeta | null) {
    this._postsMeta = value;
  }

  private set users(value: IUser[]) {
    this._users = value;
  }

  private set usersMeta(value: IMeta | null) {
    this._usersMeta = value;
  }

  private set isPostsLoading(value: boolean) {
    this._isPostsLoading = value;
  }

  private set isUsersLoading(value: boolean) {
    this._isUsersLoading = value;
  }

  private set isPostsRefreshing(value: boolean) {
    this._isPostsRefreshing = value;
  }

  private set isUsersRefreshing(value: boolean) {
    this._isUsersRefreshing = value;
  }

  async loadPosts(): Promise<void> {
    this.isPostsLoading = true;

    try {
      const data = await this.searchPostsUseCase.execute({ page: 1, perPage: 20 });

      this.posts = data.results;
      this.postsMeta = data.meta;
    } catch (e) {
      Toast.show({ text1: (e as IHttpError).message as string, type: Toasts.Error });
    } finally {
      this.isPostsLoading = false;
    }
  }

  async loadUsers(): Promise<void> {
    this.isUsersLoading = true;

    try {
      const data = await this.searchUsersUseCase.execute({ page: 1, perPage: 20 });

      this.users = data.results;
      this.usersMeta = data.meta;
    } catch (e) {
      Toast.show({ text1: (e as IHttpError).message as string, type: Toasts.Error });
    } finally {
      this.isUsersLoading = false;
    }
  }

  async refreshPosts(): Promise<void> {
    this.isPostsRefreshing = true;

    try {
      const data = await this.searchPostsUseCase.execute({ page: 1, perPage: 20 });

      this.posts = data.results;
      this.postsMeta = data.meta;
    } catch (e) {
      Toast.show({ text1: (e as IHttpError).message as string, type: Toasts.Error });
    } finally {
      this.isPostsRefreshing = false;
    }
  }

  async refreshUsers(): Promise<void> {
    this.isUsersRefreshing = true;

    try {
      const data = await this.searchUsersUseCase.execute({ page: 1, perPage: 20 });

      this.users = data.results;
      this.usersMeta = data.meta;
    } catch (e) {
      Toast.show({ text1: (e as IHttpError).message as string, type: Toasts.Error });
    } finally {
      this.isUsersRefreshing = false;
    }
  }

  async loadMorePosts(page: number): Promise<void> {
    try {
      const data: IPagination<IPost> = await this.searchPostsUseCase.execute({ page, perPage: 20 });

      this.posts = mergeArraysWithoutDuplicates(this._posts, data.results, 'id');
      this.postsMeta = data.meta;
    } catch (e) {
      Toast.show({ text1: (e as IHttpError).message as string, type: Toasts.Error });
    }
  }

  async loadMoreUsers(page: number): Promise<void> {
    try {
      const data: IPagination<IUser> = await this.searchUsersUseCase.execute({ page, perPage: 20 });

      this.users = mergeArraysWithoutDuplicates(this._users, data.results, 'id');
      this.usersMeta = data.meta;
    } catch (e) {
      Toast.show({ text1: (e as IHttpError).message as string, type: Toasts.Error });
    }
  }
}

export default SearchViewModel;
