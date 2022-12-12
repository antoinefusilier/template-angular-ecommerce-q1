import { AfterViewInit, Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { DirectionService } from '../../../shared/services/direction.service';
import { RootService } from '../../../shared/services/root.service';
import { Brand } from '../../../shared/interfaces/brand';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-block-brands',
    templateUrl: './block-brands.component.html',
    styleUrls: ['./block-brands.component.scss']
})
export class BlockBrandsComponent implements AfterViewInit {
    @Input() brands: Brand[] = [];

    @ViewChild('container', {read: ElementRef}) container!: ElementRef;

    showCarousel = true;

    carouselOptions = {
        items: 6,
        nav: false,
        dots: false,
        loop: true,
        responsive: {
            1100: {items: 6},
            920: {items: 5},
            680: {items: 4},
            500: {items: 3},
            0: {items: 2}
        },
        rtl: this.direction.isRTL()
    };

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        public root: RootService,
        private direction: DirectionService
    ) { }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            const container = this.container.nativeElement as HTMLElement;
            const containerWidth = container.getBoundingClientRect().width;

            window.addEventListener('load', () => {
                const newContainerWidth = container.getBoundingClientRect().width;

                if (containerWidth !== newContainerWidth) {
                    this.showCarousel = false;

                    setTimeout(() => this.showCarousel = true, 0);
                }
            });
        }
    }
}
