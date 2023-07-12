import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PagePostComponent } from './pages/page-post/page-post.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'category-classic'
    },
    {
        path: 'category-classic',
        component: PageCategoryComponent,
        data: {
            sidebarPosition: 'end',    // one of [start, end]. For LTR scripts "start" is "left" and "end" is "right"
            layout:          'classic' // one of [classic, grid, list]
        }
    },
    {
        path: 'category-grid',
        component: PageCategoryComponent,
        data: {
            sidebarPosition: 'end', // one of [start, end]. For LTR scripts "start" is "left" and "end" is "right"
            layout:          'grid' // one of [classic, grid, list]
        }
    },
    {
        path: 'category-list',
        component: PageCategoryComponent,
        data: {
            sidebarPosition: 'end', // one of [start, end]. For LTR scripts "start" is "left" and "end" is "right"
            layout:          'list' // one of [classic, grid, list]
        }
    },
    {
        path: 'category-left-sidebar',
        component: PageCategoryComponent,
        data: {
            sidebarPosition: 'start',  // one of [start, end]. For LTR scripts "start" is "left" and "end" is "right"
            layout:          'classic' // one of [classic, grid, list]
        }
    },
    {
        path: 'post-classic',
        component: PagePostComponent,
        data: {
            sidebarPosition: 'end',    // one of [start, end]. For LTR scripts "start" is "left" and "end" is "right"
            layout:          'classic'
        }
    },
    {
        path: 'post-full',
        component: PagePostComponent,
        data: {
            layout: 'full'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }
