import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompareService } from '../../../../shared/services/compare.service';
import { CartService } from '../../../../shared/services/cart.service';
import { Product } from '../../../../shared/interfaces/product';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RootService } from '../../../../shared/services/root.service';

interface Feature {
    name: string;
    values: {[productId: number]: string};
}

@Component({
    selector: 'app-compare',
    templateUrl: './page-compare.component.html',
    styleUrls: ['./page-compare.component.scss']
})
export class PageCompareComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();

    products: Product[] = [];
    features: Feature[] = [];
    addedToCartProducts: Product[] = [];
    removedProducts: Product[] = [];

    constructor(
        public root: RootService,
        private compare: CompareService,
        private cart: CartService
    ) { }

    ngOnInit(): void {
        this.compare.items$.pipe(takeUntil(this.destroy$)).subscribe(products => {
            const features: Feature[] = [];

            products.forEach(product => product.attributes.forEach(productAttribute => {
                let feature: Feature|undefined = features.find(eachFeature => eachFeature.name === productAttribute.name);

                if (!feature) {
                    feature = {
                        name: productAttribute.name,
                        values: {}
                    };
                    features.push(feature);
                }

                feature.values[product.id] = productAttribute.values.map(x => x.name).join(', ');
            }));

            this.products = products;
            this.features = features;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    addToCart(product: Product): void {
        if (this.addedToCartProducts.includes(product)) {
            return;
        }

        this.addedToCartProducts.push(product);
        this.cart.add(product, 1).subscribe({
            complete: () => {
                this.addedToCartProducts = this.addedToCartProducts.filter(eachProduct => eachProduct !== product);
            }
        });
    }

    remove(product: Product): void {
        if (this.removedProducts.includes(product)) {
            return;
        }

        this.removedProducts.push(product);
        this.compare.remove(product).subscribe({
            complete: () => {
                this.removedProducts = this.removedProducts.filter(eachProduct => eachProduct !== product);
            }
        });
    }
}
