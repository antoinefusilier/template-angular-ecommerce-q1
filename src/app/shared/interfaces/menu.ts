import { NestedLink } from './nested-link';

export interface Menu {
    type: 'menu';
    items: NestedLink[];
}
