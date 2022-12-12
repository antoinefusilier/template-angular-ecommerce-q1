import { Component, Input } from '@angular/core';
import { PostComment } from '../../../../shared/interfaces/post-comment';

@Component({
    selector: 'app-comments-list',
    templateUrl: './comments-list.component.html',
    styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent {
    @Input() comments: PostComment[] = [];
    @Input() level = 0;

    constructor() { }
}
