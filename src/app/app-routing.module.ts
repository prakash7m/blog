import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsHomeContainerComponent } from './posts-home-container/posts-home-container.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [{
  path: '', component: PostsHomeContainerComponent
}, {
  path: 'post', component: PostComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
