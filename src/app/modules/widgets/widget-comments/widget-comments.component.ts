import { Component, Input } from '@angular/core';
import { PostComment } from '../../../shared/interfaces/post-comment';

@Component({
    selector: 'app-widget-comments',
    templateUrl: './widget-comments.component.html',
    styleUrls: ['./widget-comments.component.scss']
})
export class WidgetCommentsComponent {
    @Input() comments: PostComment[] = [];

    constructor() { }
}
