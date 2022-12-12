export interface CategoryDef {
    name: string;
    slug: string;
    image?: string;
    items?: number;
    children?: CategoryDef[];
}
