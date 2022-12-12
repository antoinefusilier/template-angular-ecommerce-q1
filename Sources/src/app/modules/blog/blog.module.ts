import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';

// modules
import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { WidgetsModule } from '../widgets/widgets.module';

// components
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { PostComponent } from './components/post/post.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// pages
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PagePostComponent } from './pages/page-post/page-post.component';

@NgModule({
    declarations: [
        // components
        CommentsListComponent,
        PostComponent,
        SidebarComponent,
        // pages
        PageCategoryComponent,
        PagePostComponent
    ],
    imports: [
        // modules (angular)
        CommonModule,
        // modules
        BlogRoutingModule,
        SharedModule,
        WidgetsModule
    ]
})
export class BlogModule { }
