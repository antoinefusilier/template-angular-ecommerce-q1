import { Address } from './address';

export interface Order {
    id: number;
    date: string;
    status: string;
    items: Array<{
        id: number,
        slug: string,
        name: string,
        image: string,
        options?: Array<{
            label: string;
            value: string;
        }>;
        price: number,
        quantity: number,
        total: number,
    }>;
    additionalLines: Array<{
        label: string,
        total: number,
    }>;
    quantity: number;
    subtotal: number;
    total: number;
    paymentMethod: string;
    shippingAddress: Address;
    billingAddress: Address;
}
