import { Component } from '@angular/core';
import { RootService } from '../../shared/services/root.service';
import { OffcanvasCartService } from '../../shared/services/offcanvas-cart.service';

@Component({
    selector: 'app-page-offcanvas-cart',
    templateUrl: './page-offcanvas-cart.component.html',
    styleUrls: ['./page-offcanvas-cart.component.scss']
})
export class PageOffcanvasCartComponent {
    constructor(
        public root: RootService,
        public offcanvasCart: OffcanvasCartService,
    ) { }
}
