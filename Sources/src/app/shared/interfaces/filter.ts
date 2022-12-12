import { Category } from './category';

export type RangeFilterValue = [number, number];
export type ListFilterValue = string[];

export interface SerializedFilterValues {
    [slug: string]: string;
}

interface FilterBase {
    type: string;
    slug: string;
    name: string;
}
interface ValuableFilterBase extends FilterBase {
    value: any;
}

export interface FilterItem {
    slug: string;
    name: string;
    count: number;
}
export interface ColorFilterItem extends FilterItem {
    color: string;
}
export interface CategoryFilterItem extends FilterItem {
    type: 'parent'|'current'|'child';
    category: Category;
}

export interface CategoryFilter extends FilterBase {
    type: 'categories';
    root: boolean;
    items: CategoryFilterItem[];
}
export interface RangeFilter extends ValuableFilterBase {
    type: 'range';
    value: RangeFilterValue;
    min: number;
    max: number;
}
export interface CheckFilter extends ValuableFilterBase {
    type: 'check';
    value: ListFilterValue;
    items: FilterItem[];
}
export interface ColorFilter extends ValuableFilterBase {
    type: 'color';
    value: ListFilterValue;
    items: ColorFilterItem[];
}
export interface RadioFilter extends ValuableFilterBase {
    type: 'radio';
    value: string;
    items: FilterItem[];
}

export type Filter = CategoryFilter | RangeFilter | CheckFilter | ColorFilter | RadioFilter;
