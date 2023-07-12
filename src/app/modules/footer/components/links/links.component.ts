import { Component, Input } from '@angular/core';
import { Link } from '../../../../shared/interfaces/link';

@Component({
    selector: 'app-footer-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.scss']
})
export class LinksComponent {
    @Input() header = '';
    @Input() links: Link[] = [];

    constructor() { }
}
