import { Component, Input } from '@angular/core';
import { Post } from '../../../shared/interfaces/post';
import { RootService } from '../../../shared/services/root.service';

@Component({
    selector: 'app-widget-posts',
    templateUrl: './widget-posts.component.html',
    styleUrls: ['./widget-posts.component.scss']
})
export class WidgetPostsComponent {
    @Input() posts: Post[] = [];

    constructor(public root: RootService) { }

    postImage(post: Post): string {
        return post.image.replace(/^\.jpg$/, '-thumbnail.jpg');
    }
}
