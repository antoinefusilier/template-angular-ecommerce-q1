import { Component, Input } from '@angular/core';
import { Post } from '../../../../shared/interfaces/post';
import { PostCommentsList } from '../../../../shared/interfaces/post-comments-list';
import { posts } from '../../../../../data/blog-posts';
import { postComments } from '../../../../../data/blog-post-comments';

@Component({
    selector: 'app-post-details',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent {
    @Input() layout: 'classic'|'full' = 'classic';

    posts: Post[] = posts;
    comments: PostCommentsList = postComments;

    constructor() { }
}
