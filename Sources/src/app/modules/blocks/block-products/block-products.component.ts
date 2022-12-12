import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-block-products',
    templateUrl: './block-products.component.html',
    styleUrls: ['./block-products.component.scss']
})
export class BlockProductsComponent {
    @Input() header = '';
    @Input() layout: 'large-first'|'large-last' = 'large-first';
    @Input() products: any[] = [];

    get large(): any {
        if (this.layout === 'large-first' && this.products.length > 0) {
            return this.products[0];
        } else if (this.layout === 'large-last' && this.products.length > 6) {
            return this.products[6];
        }

        return null;
    }

    get smalls(): any[] {
        if (this.layout === 'large-first') {
            return this.products.slice(1, 7);
        } else  {
            return this.products.slice(0, 6);
        }
    }

    constructor() { }
}
