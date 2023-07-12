import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../../shared/interfaces/post';
import { posts } from '../../../../../data/blog-posts';
import { latestComments } from '../../../../../data/blog-widget-latest-comments';
import { BlogService } from '../../../../shared/api/blog.service';
import { Category } from '../../../../shared/interfaces/category';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    @Input() position: 'start'|'end' = 'start';

    posts: Post[] = posts;
    categories: Category[] = [];
    latestComments = latestComments;

    constructor(
        private blog: BlogService,
    ) { }

    ngOnInit(): void {
        this.blog.getCategories(null, 1).subscribe(x => this.categories = x);
    }
}
