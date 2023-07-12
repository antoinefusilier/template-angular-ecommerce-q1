import { Order } from '../app/shared/interfaces/order';

export const orders: Partial<Order>[] = [
    {
        id: 8132,
        date: '02 April, 2019',
        status: 'Pending',
        total: 2719,
        quantity: 5,
    },
    {
        id: 7592,
        date: '28 March, 2019',
        status: 'Pending',
        total: 374,
        quantity: 3,
    },
    {
        id: 7192,
        date: '15 March, 2019',
        status: 'Shipped',
        total: 791,
        quantity: 4,
    },
    {
        id: 6321,
        date: '28 February, 2019',
        status: 'Completed',
        total: 57,
        quantity: 1,
    },
    {
        id: 6001,
        date: '21 February, 2019',
        status: 'Completed',
        total: 252,
        quantity: 2,
    },
    {
        id: 4120,
        date: '11 December, 2018',
        status: 'Completed',
        total: 3978,
        quantity: 7,
    }
];
