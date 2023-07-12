import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post';
import { RootService } from '../../services/root.service';

@Component({
    selector: 'app-post-card',
    templateUrl: './post-card.component.html',
    styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
    @Input() post!: Post;
    @Input() layout: 'grid-nl'|'grid-lg'|'list-nl'|'list-sm'|null = null;

    constructor(public root: RootService) { }
}
