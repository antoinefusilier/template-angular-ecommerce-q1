import { Component, Input } from '@angular/core';
import { RootService } from '../../../shared/services/root.service';

@Component({
    selector: 'app-widget-categories',
    templateUrl: './widget-categories.component.html',
    styleUrls: ['./widget-categories.component.scss']
})
export class WidgetCategoriesComponent {
    @Input() location: 'blog'|'shop' = 'blog';
    @Input() categories: any[] = [];

    constructor(
        public root: RootService,
    ) { }

}
