import { Component, Input } from '@angular/core';
import { Link } from '../../interfaces/link';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
    @Input() header = '';
    @Input() breadcrumbs: Link[] = [];

    constructor() { }
}
