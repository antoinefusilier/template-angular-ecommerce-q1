import { ListFilterValue, RangeFilterValue } from '../interfaces/filter';

export function parseFilterValue(filterType: 'check', value: string): ListFilterValue;
export function parseFilterValue(filterType: 'range', value: string): RangeFilterValue;
export function parseFilterValue(filterType: string, value: string): any {
    switch (filterType) {
        case 'range':
            return value.split('-').map(x => parseFloat(x));
        case 'check':
        case 'color':
            return value.trim() === '' ? [] : value.split(',');
    }

    return value;
}
