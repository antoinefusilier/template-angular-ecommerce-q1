import { BrandDef } from '../interfaces/brand-def';
import { Brand } from '../../app/shared/interfaces/brand';
import { Observable, of } from 'rxjs';

let lastBrandId = 0;

const brandsDef: BrandDef[] = [
    {name: 'Brandix', slug: 'brandix', image: 'assets/images/logos/logo-1.png'},
    {name: 'Wakita', slug: 'wakita', image: 'assets/images/logos/logo-2.png'},
    {name: 'Zosch', slug: 'zosch', image: 'assets/images/logos/logo-3.png'},
    {name: 'WeVALT', slug: 'wevalt', image: 'assets/images/logos/logo-4.png'},
    {name: 'Hammer', slug: 'hammer', image: 'assets/images/logos/logo-5.png'},
    {name: 'Mitasia', slug: 'mitasia', image: 'assets/images/logos/logo-6.png'},
    {name: 'Metaggo', slug: 'metaggo', image: 'assets/images/logos/logo-7.png'},
];

export const brands: Brand[] = brandsDef.map(brandDef => {
    return {
        ...brandDef,
        id: ++lastBrandId,
    };
});

export function getBrands(): Observable<Brand[]> {
    return of(brands);
}

