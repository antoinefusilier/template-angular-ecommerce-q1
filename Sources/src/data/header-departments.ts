import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const departments: NavigationLink[] = [
    {label: 'Power Tools', url: '/shop/catalog', menu: {
        type: 'megamenu',
        size: 'xl',
        image: 'assets/images/megamenu/megamenu-1.jpg',
        columns: [
            {size: 3, items: [
                {label: 'Power Tools', url: '/shop/catalog', items: [
                    {label: 'Engravers', url: '/shop/catalog'},
                    {label: 'Drills', url: '/shop/catalog'},
                    {label: 'Wrenches', url: '/shop/catalog'},
                    {label: 'Plumbing', url: '/shop/catalog'},
                    {label: 'Wall Chaser', url: '/shop/catalog'},
                    {label: 'Pneumatic Tools', url: '/shop/catalog'},
                    {label: 'Milling Cutters', url: '/shop/catalog'}
                ]},
                {label: 'Workbenches', url: '/shop/catalog'},
                {label: 'Presses', url: '/shop/catalog'},
                {label: 'Spray Guns', url: '/shop/catalog'},
                {label: 'Riveters', url: '/shop/catalog'}
            ]},
            {size: 3, items: [
                {label: 'Hand Tools', url: '/shop/catalog', items: [
                    {label: 'Screwdrivers', url: '/shop/catalog'},
                    {label: 'Handsaws', url: '/shop/catalog'},
                    {label: 'Knives', url: '/shop/catalog'},
                    {label: 'Axes', url: '/shop/catalog'},
                    {label: 'Multitools', url: '/shop/catalog'},
                    {label: 'Paint Tools', url: '/shop/catalog'}
                ]},
                {label: 'Garden Equipment', url: '/shop/catalog', items: [
                    {label: 'Motor Pumps', url: '/shop/catalog'},
                    {label: 'Chainsaws', url: '/shop/catalog'},
                    {label: 'Electric Saws', url: '/shop/catalog'},
                    {label: 'Brush Cutters', url: '/shop/catalog'}
                ]}
            ]},
            {size: 3, items: [
                {label: 'Machine Tools', url: '/shop/catalog', items: [
                    {label: 'Thread Cutting', url: '/shop/catalog'},
                    {label: 'Chip Blowers', url: '/shop/catalog'},
                    {label: 'Sharpening Machines', url: '/shop/catalog'},
                    {label: 'Pipe Cutters', url: '/shop/catalog'},
                    {label: 'Slotting machines', url: '/shop/catalog'},
                    {label: 'Lathes', url: '/shop/catalog'}
                ]}
            ]},
            {size: 3, items: [
                {label: 'Instruments', url: '/shop/catalog', items: [
                    {label: 'Welding Equipment', url: '/shop/catalog'},
                    {label: 'Power Tools', url: '/shop/catalog'},
                    {label: 'Hand Tools', url: '/shop/catalog'},
                    {label: 'Measuring Tool', url: '/shop/catalog'}
                ]}
            ]}
        ]
    }},
    {label: 'Hand Tools', url: '/shop/catalog', menu: {
        type: 'megamenu',
        size: 'lg',
        image: 'assets/images/megamenu/megamenu-2.jpg',
        columns: [
            {size: 4, items: [
                {label: 'Hand Tools', url: '/shop/catalog', items: [
                    {label: 'Screwdrivers', url: '/shop/catalog'},
                    {label: 'Handsaws', url: '/shop/catalog'},
                    {label: 'Knives', url: '/shop/catalog'},
                    {label: 'Axes', url: '/shop/catalog'},
                    {label: 'Multitools', url: '/shop/catalog'},
                    {label: 'Paint Tools', url: '/shop/catalog'}
                ]},
                {label: 'Garden Equipment', url: '/shop/catalog', items: [
                    {label: 'Motor Pumps', url: '/shop/catalog'},
                    {label: 'Chainsaws', url: '/shop/catalog'},
                    {label: 'Electric Saws', url: '/shop/catalog'},
                    {label: 'Brush Cutters', url: '/shop/catalog'}
                ]}
            ]},
            {size: 4, items: [
                {label: 'Machine Tools', url: '/shop/catalog', items: [
                    {label: 'Thread Cutting', url: '/shop/catalog'},
                    {label: 'Chip Blowers', url: '/shop/catalog'},
                    {label: 'Sharpening Machines', url: '/shop/catalog'},
                    {label: 'Pipe Cutters', url: '/shop/catalog'},
                    {label: 'Slotting machines', url: '/shop/catalog'},
                    {label: 'Lathes', url: '/shop/catalog'}
                ]}
            ]},
            {size: 4, items: [
                {label: 'Instruments', url: '/shop/catalog', items: [
                    {label: 'Welding Equipment', url: '/shop/catalog'},
                    {label: 'Power Tools', url: '/shop/catalog'},
                    {label: 'Hand Tools', url: '/shop/catalog'},
                    {label: 'Measuring Tool', url: '/shop/catalog'}
                ]}
            ]}
        ]
    }},
    {label: 'Machine Tools', url: '/shop/catalog', menu: {
        type: 'megamenu',
        size: 'nl',
        image: 'assets/images/megamenu/megamenu-3.jpg',
        columns: [
            {size: 6, items: [
                {label: 'Hand Tools', url: '/shop/catalog', items: [
                    {label: 'Screwdrivers', url: '/shop/catalog'},
                    {label: 'Handsaws', url: '/shop/catalog'},
                    {label: 'Knives', url: '/shop/catalog'},
                    {label: 'Axes', url: '/shop/catalog'},
                    {label: 'Multitools', url: '/shop/catalog'},
                    {label: 'Paint Tools', url: '/shop/catalog'}
                ]},
                {label: 'Garden Equipment', url: '/shop/catalog', items: [
                    {label: 'Motor Pumps', url: '/shop/catalog'},
                    {label: 'Chainsaws', url: '/shop/catalog'},
                    {label: 'Electric Saws', url: '/shop/catalog'},
                    {label: 'Brush Cutters', url: '/shop/catalog'}
                ]}
            ]},
            {size: 6, items: [
                {label: 'Instruments', url: '/shop/catalog', items: [
                    {label: 'Welding Equipment', url: '/shop/catalog'},
                    {label: 'Power Tools', url: '/shop/catalog'},
                    {label: 'Hand Tools', url: '/shop/catalog'},
                    {label: 'Measuring Tool', url: '/shop/catalog'}
                ]}
            ]}
        ]
    }},
    {label: 'Building Supplies', url: '/shop/catalog', menu: {
        type: 'megamenu',
        size: 'sm',
        columns: [
            {size: 12, items: [
                {label: 'Hand Tools', url: '/shop/catalog', items: [
                    {label: 'Screwdrivers', url: '/shop/catalog'},
                    {label: 'Handsaws', url: '/shop/catalog'},
                    {label: 'Knives', url: '/shop/catalog'},
                    {label: 'Axes', url: '/shop/catalog'},
                    {label: 'Multitools', url: '/shop/catalog'},
                    {label: 'Paint Tools', url: '/shop/catalog'}
                ]},
                {label: 'Garden Equipment', url: '/shop/catalog', items: [
                    {label: 'Motor Pumps', url: '/shop/catalog'},
                    {label: 'Chainsaws', url: '/shop/catalog'},
                    {label: 'Electric Saws', url: '/shop/catalog'},
                    {label: 'Brush Cutters', url: '/shop/catalog'}
                ]}
            ]}
        ]
    }},
    {label: 'Electrical', url: '/shop/catalog', menu: {
        type: 'menu',
        items: [
            {label: 'Soldering Equipment', url: '/shop/catalog', items: [
                {label: 'Soldering Station', url: '/shop/catalog'},
                {label: 'Soldering Dryers', url: '/shop/catalog'},
                {label: 'Gas Soldering Iron', url: '/shop/catalog'},
                {label: 'Electric Soldering Iron', url: '/shop/catalog'}
            ]},
            {label: 'Light Bulbs', url: '/shop/catalog'},
            {label: 'Batteries', url: '/shop/catalog'},
            {label: 'Light Fixtures', url: '/shop/catalog'},
            {label: 'Warm Floor', url: '/shop/catalog'},
            {label: 'Generators', url: '/shop/catalog'},
            {label: 'UPS', url: '/shop/catalog'}
        ]
    }},
    {label: 'Power Machinery',        url: '/shop/catalog'},
    {label: 'Measurement',            url: '/shop/catalog'},
    {label: 'Clothes & PPE',          url: '/shop/catalog'},
    {label: 'Plumbing',               url: '/shop/catalog'},
    {label: 'Storage & Organization', url: '/shop/catalog'},
    {label: 'Welding & Soldering',    url: '/shop/catalog'}
];
