import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Params, Resolve, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { ProductsList } from '../../../shared/interfaces/list';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RootService } from '../../../shared/services/root.service';
import { ListOptions, ShopService } from '../../../shared/api/shop.service';

export function parseProductsListParams(params: Params): ListOptions {
    const options: ListOptions = {};

    if (params['page']) {
        options.page = parseFloat(params['page']);
    }
    if (params['limit']) {
        options.limit = parseFloat(params['limit']);
    }
    if (params['sort']) {
        options.sort = params['sort'];
    }

    for (const param of Object.keys(params)) {
        const mr = param.match(/^filter_([-_A-Za-z0-9]+)$/);

        if (!mr) {
            continue;
        }

        const filterSlug = mr[1];

        if (!options.filterValues) {
            options.filterValues = {};
        }

        options.filterValues[filterSlug] = params[param];
    }

    return options;
}

@Injectable({
    providedIn: 'root'
})
export class ProductsListResolverService implements Resolve<ProductsList> {
    constructor(
        private root: RootService,
        private router: Router,
        private shop: ShopService,
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<ProductsList> {
        const categorySlug = route.params['categorySlug'] || route.data['categorySlug'] || null;

        return this.shop.getProductsList(categorySlug, parseProductsListParams(route.queryParams)).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 404) {
                    this.router.navigate([this.root.notFound()]).then();
                }

                return EMPTY;
            })
        );
    }
}
