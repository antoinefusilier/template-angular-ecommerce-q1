import { Component, HostBinding, Input } from '@angular/core';
import { Product } from '../../../../shared/interfaces/product';

@Component({
    selector: 'app-block-product-columns-item',
    templateUrl: './block-product-columns-item.component.html',
    styleUrls: ['./block-product-columns-item.component.sass']
})
export class BlockProductColumnsItemComponent {
    @HostBinding('class.col') classCol = true;

    @Input() header = '';
    @Input() products: Product[] = [];

    constructor() { }
}
