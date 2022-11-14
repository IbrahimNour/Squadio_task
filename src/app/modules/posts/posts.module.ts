import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsSearchComponent } from './posts-list/posts-search/posts-search.component';

@NgModule({
  declarations: [PostsComponent, PostsListComponent, PostsSearchComponent],
  imports: [CommonModule, PostsRoutingModule, SharedModule],
})
export class PostsModule {}
