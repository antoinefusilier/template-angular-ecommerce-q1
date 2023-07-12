import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { OwlCarouselOConfig } from 'ngx-owl-carousel-o/lib/carousel/owl-carousel-o-config';

@Directive({
    selector: '[appFakeSlides]',
    exportAs: 'appFakeSlides'
})
export class FakeSlidesDirective implements OnInit, OnChanges, OnDestroy {
    @Input() options: Partial<OwlCarouselOConfig>|null = null;
    @Input() appFakeSlides = 0;

    slides: number[] = [];
    slidesCount = 0;

    private resizeHandler: () => void = () => {};

    constructor(
        private eventManager: EventManager,
        private el: ElementRef
    ) { }

    ngOnInit(): void {
        this.resizeHandler = this.eventManager.addGlobalEventListener('window', 'resize', () => this.calc()) as () => void;
        this.calc();
    }

    calc(): void {
        let newFakeSlidesCount = 0;

        if (this.options) {
            let match = -1;
            const viewport = this.el.nativeElement.querySelector('.owl-carousel').clientWidth;
            const overwrites = this.options.responsive as {[breakpoint: number]: any};

            if (overwrites) {
                for (const key in overwrites) {
                    if (overwrites.hasOwnProperty(key)) {
                        if (+key <= viewport && +key > match) {
                            match = Number(key);
                        }
                    }
                }
            }

            if (match >= 0) {
                const items = overwrites[match].items;
                newFakeSlidesCount = Math.max(0, items - this.appFakeSlides);
            } else if (this.options.items) {
                newFakeSlidesCount = Math.max(0, this.options.items - this.appFakeSlides);
            }
        }

        if (this.slidesCount !== newFakeSlidesCount) {
            this.slides = [];
            this.slidesCount = newFakeSlidesCount;

            for (let i = 0; i < newFakeSlidesCount; i++) {
                this.slides.push(i);
            }
        }
    }

    ngOnChanges(): void {
        this.calc();
    }

    ngOnDestroy(): void {
        if (this.resizeHandler) {
            this.resizeHandler();
        }
    }
}
