import { CustomFields } from './custom-fields';

export interface Category {
    id: number;
    type: 'shop'|'blog';
    name: string;
    slug: string;
    path: string;
    image: string|null;
    items: number;
    customFields: CustomFields;
    parents?: Category[]|null;
    children?: Category[]|null;
}
