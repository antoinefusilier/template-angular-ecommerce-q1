import { Component } from '@angular/core';
import { theme } from '../../../../data/theme';

@Component({
    selector: 'app-widget-aboutus',
    templateUrl: './widget-aboutus.component.html',
    styleUrls: ['./widget-aboutus.component.scss']
})
export class WidgetAboutusComponent {
    theme = theme;

    constructor() { }
}
