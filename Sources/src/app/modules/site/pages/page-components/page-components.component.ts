import { Component } from '@angular/core';

@Component({
    selector: 'app-components',
    templateUrl: './page-components.component.html',
    styleUrls: ['./page-components.component.scss']
})
export class PageComponentsComponent {
    showAlert = true;

    constructor() { }
}
