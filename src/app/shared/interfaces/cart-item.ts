import { Product } from './product';

export interface CartItem {
    product: Product;
    options: {
        name: string;
        value: string;
    }[];
    quantity: number;
}
