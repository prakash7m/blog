import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { CategoryTilesComponent } from './category-tiles/category-tiles.component';
import { FooterComponent } from './footer/footer.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { PostTilesComponent } from './post-tiles/post-tiles.component';
import { CategoryHeroComponent } from './category-hero/category-hero.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    CategoryTilesComponent,
    FooterComponent,
    SubscribeComponent,
    PostTilesComponent,
    CategoryHeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
