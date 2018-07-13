import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { CategoryTilesComponent } from './category-tiles/category-tiles.component';
import { FooterComponent } from './footer/footer.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { PostTilesComponent } from './post-tiles/post-tiles.component';
import { CategoryHeroComponent } from './category-hero/category-hero.component';
import { ContainerWithSidebarComponent } from './container-with-sidebar/container-with-sidebar.component';
import { ArticleComponent } from './article/article.component';
import { SidebarPanelComponent } from './sidebar-panel/sidebar-panel.component';
import { PostComponent } from './post/post.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostsHomeComponent } from './posts-home/posts-home.component';
import { PostsHomeContainerComponent } from './posts-home-container/posts-home-container.component';
import { PostContainerComponent } from './post-container/post-container.component';
import { HttpModule } from '@angular/http';
import { ArticleService } from './article/article.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    CategoryTilesComponent,
    FooterComponent,
    SubscribeComponent,
    PostTilesComponent,
    CategoryHeroComponent,
    ContainerWithSidebarComponent,
    ArticleComponent,
    SidebarPanelComponent,
    PostComponent,
    SidebarComponent,
    PostsHomeComponent,
    PostsHomeContainerComponent,
    PostContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MarkdownModule.forRoot()
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
