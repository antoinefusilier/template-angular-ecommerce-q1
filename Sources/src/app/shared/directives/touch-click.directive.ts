import { Directive, ElementRef, EventEmitter, Inject, NgZone, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fromTouchClick } from '../functions/rxjs/fromTouchClick';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[appTouchClick]'
})
export class TouchClickDirective implements OnInit, OnDestroy {
    @Output() appTouchClick: EventEmitter<TouchEvent> = new EventEmitter<TouchEvent>();

    private destroy$: Subject<void> = new Subject<void>();

    get element(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private elementRef: ElementRef,
        private zone: NgZone,
    ) { }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                fromTouchClick(this.element).pipe(takeUntil(this.destroy$)).subscribe(event => {
                    this.zone.run(() => this.appTouchClick.emit(event));
                });
            });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
