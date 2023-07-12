import { Observable, throwError, timer } from 'rxjs';
import { ProductsList } from '../app/shared/interfaces/list';
import { Product } from '../app/shared/interfaces/product';
import {
    CategoryFilterItem,
    CheckFilter, ColorFilter,
    ColorFilterItem,
    Filter,
    FilterItem,
    RadioFilter
} from '../app/shared/interfaces/filter';
import { HttpErrorResponse } from '@angular/common/http';
import { attributesDef, products as productsTable } from './database/products';
import { Category } from '../app/shared/interfaces/category';
import { map } from 'rxjs/operators';
import { shopCategoriesList, shopCategoriesTree } from './database/categories';
import { ListOptions } from '../app/shared/api/shop.service';

interface FilterDef {
    type: Filter['type'];
    slug: string;
    name: string;
}
interface FilterListValueDef {
    slug: string;
    name: string;
}
type FilterValueDef = number | FilterListValueDef[];

/**
 * Returns products list.
 *
 * @param categorySlug Unique human-readable category identifier.
 * @param options Options list.
 */
export function getProductsList(categorySlug: string|null, options: ListOptions): Observable<ProductsList> {
    const page = options.page || 1;
    const limit = options.limit || 12;
    const sort = options.sort || 'default';
    const filterValues = options.filterValues || {};
    const filters: Filter[] = [];
    const filtersDef: FilterDef[] = [
        {type: 'range', slug: 'price', name: 'Price'},
        {type: 'check', slug: 'brand', name: 'Brand'},
        {type: 'radio', slug: 'discount', name: 'With Discount'},
        {type: 'color', slug: 'color', name: 'Color'},
    ];
    let items = productsTable.slice();

    // Make filters.
    if (categorySlug === null) {
        filters.push({
            type: 'categories',
            slug: 'categories',
            name: 'Categories',
            root: true,
            items: [
                ...shopCategoriesTree.map(x => makeCategoryFilterItem('child', x)),
            ],
        });
    } else {
        const category = shopCategoriesList.find(x => x.slug === categorySlug);

        if (!category) {
            return throwError(new HttpErrorResponse({status: 404, statusText: 'Page Not Found'}));
        }

        filters.push({
            type: 'categories',
            slug: 'categories',
            name: 'Categories',
            root: false,
            items: [
                ...(category.parents || []).map(x => makeCategoryFilterItem('parent', x)),
                makeCategoryFilterItem('current', category),
                ...(category.children || []).map(x => makeCategoryFilterItem('child', x)),
            ],
        });
    }

    makeFilters(filtersDef, items).forEach(x => filters.push(x));

    // Apply values to filters.
    filters.forEach(filter => {
        if (filter.slug in filterValues && 'value' in filter) {
            filter.value = parseFilterValue(filter, filterValues[filter.slug]);
        }
    });

    // Calculate items count for filter values.
    filters.forEach(filter => {
        if (filter.type !== 'check' && filter.type !== 'color' && filter.type !== 'radio') {
            return;
        }

        const counts = calcProductsForFilterValues(filter, filters, items);

        filter.items.forEach(item => {
            if (item.slug in counts) {
                item.count = counts[item.slug];
            }
        });
    });

    // Apply filters to items list.
    items = items.filter(product => {
        return filters.reduce<boolean>((result, filter) => result && testProduct(filter, product), true);
    });

    // Sort items array.
    items = items.sort((a, b) => {
        if (['name_asc', 'name_desc'].includes(sort)) {
            if ( a.name === b.name ) {
                return 0;
            }

            return (a.name > b.name ? 1 : -1) * (sort === 'name_asc' ? 1 : -1);
        }

        return 0;
    });

    // Preparing data for a response.
    const start = (page - 1) * limit;
    const end = start + limit;

    const total = items.length;
    const pages = Math.ceil(total / limit);
    const from = (page - 1) * limit + 1;
    const to = Math.max(Math.min(page * limit, total), from);

    items = items.slice(start, end);

    const response: ProductsList = {
        items,
        page,
        limit,
        total,
        pages,
        from,
        to,
        sort,
        filters,
        filterValues,
    };

    return timer(350).pipe(map(() => JSON.parse(JSON.stringify(response))));
}

/**
 * Returns corresponding filter value from product object.
 *
 * @param type         - Filter type.
 * @param slug         - Filter slug.
 * @param product      - Product object.
 * @param defaultValue - Default value.
 */
function getFilterValue(type: 'range', slug: string, product: Product, defaultValue: number|null): number;
function getFilterValue(type: 'check', slug: string, product: Product, defaultValue: FilterListValueDef[]): FilterListValueDef[];
function getFilterValue(type: string, slug: string, product: Product, defaultValue: FilterValueDef|null = null): FilterValueDef|null {
    if (type === 'range' && slug === 'price') {
        return product.price;
    } else if (type === 'check' && slug === 'brand') {
        if (product.brand && typeof product.brand === 'object') {
            return [{slug: product.brand.slug, name: product.brand.name}];
        }
    } else if (type === 'check' && slug === 'discount') {
        const items = [
            {slug: 'any', name: 'Any'},
        ];

        if (product.compareAtPrice) {
            items.push({slug: 'yes', name: 'Yes'});
        } else {
            items.push({slug: 'no', name: 'No'});
        }

        return items;
    } else if (type === 'check' || type === 'radio') {
        if (!('attributes' in product) || !Array.isArray(product.attributes)) {
            return defaultValue;
        }

        const attribute = product.attributes.find(x => x.slug === slug);

        if (!attribute) {
            return defaultValue;
        }

        return attribute.values.map(x => ({slug: x.slug, name: x.name}));
    }

    return defaultValue;
}

function getRangeValue(slug: string, product: Product, defaultValue: number|null = null): number {
    return getFilterValue('range', slug, product, defaultValue);
}

function getListValues(slug: string, product: Product, defaultValue: FilterListValueDef[] = []): FilterListValueDef[] {
    return getFilterValue('check', slug, product, defaultValue);
}

function getColorCode(slug: string): string {
    switch (slug) {
        case 'white':  return '#fff';
        case 'silver': return '#d9d9d9';
        case 'light-gray': return '#b3b3b3';
        case 'gray': return '#808080';
        case 'dark-gray': return '#666';
        case 'coal': return '#4d4d4d';
        case 'black': return '#262626';
        case 'red':  return '#ff4040';
        case 'orange': return '#ff8126';
        case 'yellow': return '#ffd333';
        case 'pear-green': return '#becc1f';
        case 'green': return '#8fcc14';
        case 'emerald': return '#47cc5e';
        case 'shamrock': return '#47cca0';
        case 'shakespeare': return '#47cccc';
        case 'blue': return '#40bfff';
        case 'dark-blue': return '#3d6dcc';
        case 'violet': return '#7766cc';
        case 'purple': return '#b852cc';
        case 'cerise': return '#e53981';
    }

    return '#000';
}

function parseFilterValue(filter: Filter, value: string): any {
    switch (filter.type) {
        case 'range':
            return value.split('-').map(x => parseFloat(x));
        case 'check':
        case 'color':
            return value.trim() === '' ? [] : value.split(',').map(x => x.trim());
    }

    return value;
}

function testProduct(filter: Filter, product: Product): boolean {
    if (filter.type === 'range') {
        const value = getRangeValue(filter.slug, product);

        if (value === null || value < filter.value[0] || value > filter.value[1]) {
            return false;
        }
    } else if (filter.type === 'check' || filter.type === 'color') {
        const values = getListValues(filter.slug, product);

        return filter.value.length < 1 || filter.value.reduce<boolean>(
            (isMatched, value) => {
                return isMatched || !!values.find(x => x.slug === value);
            },
            false
        );
    } else if (filter.type === 'radio') {
        const values = getListValues(filter.slug, product);

        return !!values.find(x => x.slug === filter.value);
    }

    return true;
}

interface ProductsForFilterValuesResult {
    [filterValueSlug: string]: number;
}

function calcProductsForFilterValues(filter: Filter, allFilters: Filter[], products: Product[]): ProductsForFilterValuesResult {
    const result: ProductsForFilterValuesResult = {};

    products = products.filter(
        product => allFilters.reduce<boolean>(
            (isMatched, eachFilter) => {
                return isMatched && (filter.slug === eachFilter.slug || testProduct(eachFilter, product));
            },
            true
        )
    );

    products.forEach(product => {
        switch (filter.type) {
            case 'check':
            case 'color':
            case 'radio':
                getListValues(filter.slug, product).forEach(value => {
                    if (!(value.slug in result)) {
                        result[value.slug] = 0;
                    }

                    result[value.slug] += 1;
                });
                break;
        }
    });

    return result;
}

function makeFilters(filtersDef: FilterDef[], products: Product[]): Filter[] {
    const result: Filter[] = [];

    filtersDef.forEach(filterDef => {
        const filterType = filterDef.type;

        if (filterType === 'range') {
            let max = products.reduce((value, product) => Math.max(value, getRangeValue(filterDef.slug, product, value)), 0);
            let min = products.reduce((value, product) => Math.min(value, getRangeValue(filterDef.slug, product, value)), max);
            /** Calculates the number of digits for rounding. */
            let digit = Math.max(Math.ceil(max).toString().length - 2, 1);

            digit = Math.pow(10, digit);
            max = Math.ceil(max / digit) * digit;
            min = Math.floor(min / digit) * digit;

            result.push({
                type: filterType,
                slug: filterDef.slug,
                name: filterDef.name,
                value: [min, max],
                // options
                min,
                max,
            });
        } else if (filterType === 'check' || filterType === 'radio' || filterType === 'color') {
            const itemsBySlug: {[slug: string]: FilterItem} = {};
            let items: FilterItem[] = [];

            products.forEach(product => {
                getListValues(filterDef.slug, product).forEach(value => {
                    if (value.slug in itemsBySlug) {
                        return;
                    }

                    const item: FilterItem = makeFilterItem(filterType, value);

                    itemsBySlug[value.slug] = item;
                    items.push(item);
                });
            });

            if (items.length < 1 || (filterType === 'radio' && items.length < 2)) {
                return;
            }

            items = sortFilterItems(filterType, filterDef.slug, items);

            result.push({
                type: filterType,
                slug: filterDef.slug,
                name: filterDef.name,
                value: filterType === 'radio' ? items[0].slug : [],
                items,
            } as CheckFilter|RadioFilter|ColorFilter);
        }
    });

    return result;
}

function makeFilterItem(filterType: 'check'|'color'|'radio', value: FilterListValueDef): FilterItem | ColorFilterItem {
    switch (filterType) {
        case 'check':
        case 'radio':
            return {
                slug: value.slug,
                name: value.name,
                count: 0,
            };
        case 'color':
            return {
                slug: value.slug,
                name: value.name,
                count: 0,
                color: getColorCode(value.slug),
            };
    }
}

function makeCategoryFilterItem(type: 'parent'|'current'|'child', category: Category): CategoryFilterItem {
    return {
        slug: category.slug,
        name: category.name,
        type,
        category: {...category, children: null, parents: null},
        count: category.items,
    };
}

function sortFilterItems(filterType: string, filterSlug: string, items: FilterItem[]): FilterItem[] {
    if (filterType === 'color' && filterSlug === 'color') {
        const attributeDef = attributesDef.find(x => x.slug === filterSlug);

        if (attributeDef) {
            const values = attributeDef.values.map(x => x.slug);

            return items.sort((a, b) => {
                return values.indexOf(a.slug) - values.indexOf(b.slug);
            });
        }
    }

    return items;
}
