export interface AttributeValueDef {
    name: string;
    slug: string;
}

export interface AttributeDef {
    name: string;
    slug: string;
    values: AttributeValueDef[];
}

export interface ProductAttributeDef {
    slug: string;
    values: string[]|string;
    featured?: true;
}

export interface ProductDef {
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number;
    images: string[];
    badges?: string|string[];
    rating: number;
    reviews: number;
    availability: string;
    brand?: string;
    categories: string[];
    attributes?: ProductAttributeDef[];
}
