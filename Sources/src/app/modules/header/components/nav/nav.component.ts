import { AfterViewInit, Component, ElementRef, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { RootService } from '../../../../shared/services/root.service';
import { HeaderService } from '../../../../shared/services/header.service';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { filter, first, shareReplay, takeUntil } from 'rxjs/operators';
import { fromMatchMedia } from '../../../../shared/functions/rxjs/fromMatchMedia';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DropcartType } from '../dropcart/dropcart.component';
import { OffcanvasCartService } from '../../../../shared/services/offcanvas-cart.service';

export type NavStickyMode = 'alwaysOnTop' | 'pullToShow';

@Component({
    selector: 'app-header-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() departments = true;
    @Input() logo = false;
    @Input() search = false;
    @Input() stickyMode: NavStickyMode | false = false;

    @ViewChild('element') elementRef!: ElementRef;

    destroy$: Subject<void> = new Subject<void>();

    stuckFrom: number|null = null;
    staticFrom: number|null = null;
    scrollPosition = 0;
    scrollDistance = 0;

    media!: Observable<MediaQueryList>;

    dropcartType: DropcartType = 'dropdown';

    get element(): HTMLDivElement {
        return this.elementRef?.nativeElement;
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private route: ActivatedRoute,
        private offcanvasCart: OffcanvasCartService,
        public root: RootService,
        public cart: CartService,
        public wishlist: WishlistService,
        public zone: NgZone,
        public header: HeaderService,
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.dropcartType = data['dropcartType'] || 'dropdown';
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngAfterViewInit(): void {
        if (this.stickyMode && isPlatformBrowser(this.platformId)) {
            this.media = fromMatchMedia('(min-width: 992px)', false).pipe(shareReplay({bufferSize: 1, refCount: true}));
            this.media.pipe(takeUntil(this.destroy$)).subscribe(media => this.onMediaChange(media));
        }
    }

    onCartClick(): void {
        if (this.dropcartType === 'offcanvas') {
            this.offcanvasCart.open();
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

        if (this.stuckFrom && this.header.navPanelPosition === 'static' && scrollCurrentPosition > this.stuckFrom) {
            this.makeSticky();
        }
        if (this.staticFrom && this.header.navPanelPosition === 'sticky' && scrollCurrentPosition <= this.staticFrom) {
            this.makeStatic();
        }

        if (this.header.navPanelPosition === 'sticky') {
            if (this.stickyMode === 'pullToShow') {
                if (this.scrollDistance <= -distanceToShow && this.header.navPanelVisibility === 'hidden') {
                    this.show();
                }
                if (this.scrollDistance >= distanceToHide && this.header.navPanelVisibility === 'shown') {
                    this.hide();
                }
            } else if (this.stickyMode === 'alwaysOnTop' && this.header.navPanelVisibility === 'hidden') {
                this.show();
            }
        }
    }

    onMediaChange(media: MediaQueryList): void {
        if (media.matches) {
            const takeUntil$ = merge(
                this.media.pipe(filter(x => !x.matches), first()),
                this.destroy$,
            );

            this.header.departmentsArea$.pipe(
                takeUntil(takeUntil$)
            ).subscribe(() => setTimeout(() => this.calcBreakpoints(), 0));

            this.zone.runOutsideAngular(() => {
                fromEvent(window, 'scroll', {passive: true}).pipe(
                    takeUntil(takeUntil$)
                ).subscribe(() => this.onScroll());
            });

            this.calcBreakpoints();
        } else {
            this.makeStatic();
        }
    }

    calcBreakpoints(): void {
        if (this.header.departmentsArea) {
            const rect = this.header.departmentsArea.getBoundingClientRect();

            this.stuckFrom = rect.top + rect.height + window.screenTop + 50 + window.pageYOffset;
            this.staticFrom = this.stuckFrom;
        } else {
            const elementRect = this.element.getBoundingClientRect();

            this.staticFrom = elementRect.top + window.pageYOffset;
            this.stuckFrom = elementRect.top + elementRect.height + window.pageYOffset;
        }
    }

    private makeStatic(): void {
        this.element.classList.remove('nav-panel--stuck');
        this.element.classList.remove('nav-panel--shown');

        this.element.style.transition = 'none';
        this.element.getBoundingClientRect(); // force reflow
        this.element.style.transition = '';

        this.zone.run(() => this.header.navPanelPosition = 'static');
        this.zone.run(() => this.header.navPanelVisibility = 'hidden');
    }

    private makeSticky(): void {
        this.element.classList.add('nav-panel--stuck');

        this.element.style.transition = 'none';
        this.element.getBoundingClientRect(); // force reflow
        this.element.style.transition = '';

        this.zone.run(() => this.header.navPanelPosition = 'sticky');
    }

    private show(): void {
        this.element.classList.add('nav-panel--shown');

        this.zone.run(() => this.header.navPanelVisibility = 'shown');
    }

    private hide(): void {
        this.element.classList.remove('nav-panel--shown');

        this.zone.run(() => this.header.navPanelVisibility = 'hidden');
    }
}
