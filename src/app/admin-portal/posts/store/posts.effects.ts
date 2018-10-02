import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import { REQUEST_LOAD_POSTS, LoadPosts, PostsError, PostAction,
  REQUEST_DELETE_POST, PostDeleteSuccess, REQUEST_CREATE_POST,
  PostCreateSuccess, REQUEST_LOAD_POST, PostLoadSuccess, ResetEditingPost, REQUEST_EDIT_POST, PostEditSuccess } from './posts.actions';
import { PostsService } from '../posts.service';
import { RowsResponse, DataResponse } from '../../core/response.model';
import { PostModel } from '../post.model';
import { PostsFeatureState } from './posts.reducer';
import { Observable } from 'rxjs/Observable';


/**
 * The posts effect class to do some asynchronous actions. Loading of posts, deleting posts, creating posts and updating.
 *
 * @export
 * @class PostsEffect
 */
@Injectable()
export class PostsEffect {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store<PostsFeatureState>,
    private router: Router
  ) { }
  @Effect()
  $requestLoadPostsEffect = this.actions$
    .ofType(REQUEST_LOAD_POSTS)
    .map((action: PostAction) => action.payload)
    .mergeMap(() => {
        return this.postsService.getPosts()
          .map((response: RowsResponse<PostModel>) => {
            if (response.rows) {
              return new LoadPosts(response.rows);
            }
          })
          .catch((err: any, caught: Observable<PostsError | LoadPosts>) => {
            this.store.dispatch(new PostsError(err, REQUEST_LOAD_POSTS));
            return Observable.of();
          });
    });

  @Effect()
  $requestDeletePostEffect = this.actions$
    .ofType(REQUEST_DELETE_POST)
    .map((action: PostAction) => action.payload)
    .mergeMap((id: string) => {
      return this.postsService.removePost(id)
        .map((response: DataResponse<PostModel>) => {
          if (response.data) {
            return new PostDeleteSuccess(response.data);
          }
        })
        .catch((err: any, caught: Observable<PostsError | PostDeleteSuccess>) => {
          this.store.dispatch(new PostsError(err, REQUEST_DELETE_POST));
          return Observable.of();
        });
    });

  @Effect()
  $requestCreatePostEffect = this.actions$
    .ofType(REQUEST_CREATE_POST)
    .map((action: PostAction) => action.payload)
    .mergeMap((post: PostModel) => {
      return this.postsService.addPost(post)
        .map((response: DataResponse<PostModel>) => {
          if (response.data) {
            this.router.navigate(['/admin/posts']);
            return new PostCreateSuccess(response.data);
          }
        })
        .catch((err: any, caught: Observable<PostsError | PostCreateSuccess>) => {
          this.store.dispatch(new PostsError(err, REQUEST_CREATE_POST));
          return Observable.of();
        });
    });
  @Effect()
  $requestLoadPostEffect = this.actions$
    .ofType(REQUEST_LOAD_POST)
    .map((action: PostAction) => action.payload)
    .mergeMap((id: string) => {
      this.store.dispatch(new ResetEditingPost());
      return this.postsService.loadPost(id)
        .map((response: DataResponse<PostModel>) => {
          if (response.data) {
            return new PostLoadSuccess(response.data);
          }
        })
        .catch((err: any, caught: Observable<PostsError | PostLoadSuccess>) => {
          this.store.dispatch(new PostsError(err, REQUEST_LOAD_POST));
          return Observable.of();
        });
    });

  @Effect()
  $requestEditPostEffect = this.actions$
    .ofType(REQUEST_EDIT_POST)
    .map((action: PostAction) => action.payload)
    .mergeMap((post: PostModel) => {
      return this.postsService.editPost(post)
        .map((response: DataResponse<PostModel>) => {
          if (response.data) {
            this.router.navigate(['/admin/posts']);
            return new PostEditSuccess(response.data);
          }
        })
        .catch((err: any, caught: Observable<PostsError | PostLoadSuccess>) => {
          this.store.dispatch(new PostsError(err, REQUEST_EDIT_POST));
          return Observable.of();
        });
    });
}
