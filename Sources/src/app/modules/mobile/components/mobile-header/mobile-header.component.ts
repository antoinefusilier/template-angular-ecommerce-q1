import { AfterViewInit, Component, ElementRef, Inject, Input, NgZone, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { MobileMenuService } from '../../../../shared/services/mobile-menu.service';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { CartService } from '../../../../shared/services/cart.service';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { fromMatchMedia } from '../../../../shared/functions/rxjs/fromMatchMedia';
import { filter, first, shareReplay, takeUntil } from 'rxjs/operators';
import { RootService } from '../../../../shared/services/root.service';

export type MobileHeaderMode = 'alwaysOnTop' | 'pullToShow';

export type MobileHeaderPosition = 'static' | 'sticky';

export type MobileHeaderVisibility = 'hidden' | 'shown';

@Component({
    selector: 'app-mobile-header',
    templateUrl: './mobile-header.component.html',
    styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent implements OnDestroy, AfterViewInit {
    @Input() stickyMode: MobileHeaderMode | false = false;

    @ViewChild('element') elementRef!: ElementRef;
    @ViewChild('panelElement') panelElementRef!: ElementRef;

    destroy$: Subject<void> = new Subject<void>();

    position: MobileHeaderPosition = 'static';
    visibility: MobileHeaderVisibility = 'hidden';

    stuckFrom: number|null = null;
    staticFrom: number|null = null;
    scrollPosition = 0;
    scrollDistance = 0;

    media!: Observable<MediaQueryList>;

    get element(): HTMLDivElement {
        return this.elementRef?.nativeElement;
    }

    get panelElement(): HTMLDivElement {
        return this.panelElementRef?.nativeElement;
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        public menu: MobileMenuService,
        public wishlist: WishlistService,
        public cart: CartService,
        public zone: NgZone,
        public root: RootService,
    ) { }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngAfterViewInit(): void {
        if (this.stickyMode && isPlatformBrowser(this.platformId)) {
            this.media = fromMatchMedia('(max-width: 991px)', false).pipe(shareReplay({bufferSize: 1, refCount: true}));
            this.media.pipe(takeUntil(this.destroy$)).subscribe(media => this.onMediaChange(media));
        }
    }

    onScroll(): void {
        const scrollCurrentPosition = window.pageYOffset;
        const scrollDelta = scrollCurrentPosition - this.scrollPosition;

        // Resets the distance if the scroll changes direction.
        if ((scrollDelta < 0) !== (this.scrollDistance < 0)) {
            this.scrollDistance = 0;
        }

        const distanceToShow = 10; // in pixels
        const distanceToHide = 25; // in pixels

        this.scrollPosition = scrollCurrentPosition;
        this.scrollDistance += scrollDelta;

        if (this.stuckFrom && this.position === 'static' && scrollCurrentPosition >= this.stuckFrom) {
            this.makeSticky();
        }
        if (this.staticFrom && this.position === 'sticky' && scrollCurrentPosition <= this.staticFrom) {
            this.makeStatic();
        }

        if (this.position === 'sticky') {
            if (this.scrollDistance <= -distanceToShow && this.visibility === 'hidden') {
                this.show();
            }
            if (this.scrollDistance >= distanceToHide && this.visibility === 'shown') {
                this.hide();
            }
        }
    }

    onMediaChange(media: MediaQueryList): void {
        if (media.matches) {
            if (this.stickyMode === 'alwaysOnTop') {
                this.element.classList.add('mobile-header--stuck');
                this.element.classList.add('mobile-header--shown');

                this.panelElement.style.transition = 'none';
                this.panelElement.getBoundingClientRect(); // force reflow
                this.panelElement.style.transition = '';

                this.zone.run(() => this.position = 'sticky');
                this.zone.run(() => this.visibility = 'shown');
            } else {
                const takeUntil$ = merge(
                    this.media.pipe(filter(x => !x.matches), first()),
                    this.destroy$,
                );

                this.zone.runOutsideAngular(() => {
                    fromEvent(window, 'scroll', {passive: true}).pipe(
                        takeUntil(takeUntil$)
                    ).subscribe(() => this.onScroll());
                });

                this.calcBreakpoints();
                this.onScroll();
            }
        } else {
            this.makeStatic();
        }
    }

    calcBreakpoints(): void {
        const elementRect = this.element.getBoundingClientRect();

        this.staticFrom = elementRect.top + window.pageYOffset;
        this.stuckFrom = elementRect.top + elementRect.height + window.pageYOffset + 100;
    }

    private makeStatic(): void {
        this.element.classList.remove('mobile-header--stuck');
        this.element.classList.remove('mobile-header--shown');

        this.panelElement.style.transition = 'none';
        this.panelElement.getBoundingClientRect(); // force reflow
        this.panelElement.style.transition = '';

        this.zone.run(() => this.position = 'static');
        this.zone.run(() => this.visibility = 'hidden');
    }

    private makeSticky(): void {
        this.element.classList.add('mobile-header--stuck');

        this.panelElement.style.transition = 'none';
        this.panelElement.getBoundingClientRect(); // force reflow
        this.panelElement.style.transition = '';

        this.zone.run(() => this.position = 'sticky');
    }

    private show(): void {
        this.element.classList.add('mobile-header--shown');

        this.zone.run(() => this.visibility = 'shown');
    }

    private hide(): void {
        this.element.classList.remove('mobile-header--shown');

        this.zone.run(() => this.visibility = 'hidden');
    }
}
