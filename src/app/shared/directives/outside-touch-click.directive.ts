import { Directive, ElementRef, EventEmitter, Inject, Input, NgZone, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fromOutsideTouchClick } from '../functions/rxjs/fromOutsideTouchClick';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[appOutsideTouchClick]'
})
export class OutsideTouchClickDirective implements OnInit, OnDestroy {
    @Input() outsideTouchClickZone = false;

    @Output() appOutsideTouchClick: EventEmitter<TouchEvent> = new EventEmitter<TouchEvent>();

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
                fromOutsideTouchClick(this.element).pipe(takeUntil(this.destroy$)).subscribe(event => {
                    if (this.outsideTouchClickZone) {
                        this.zone.run(() => this.appOutsideTouchClick.emit(event));
                    } else {
                        this.appOutsideTouchClick.emit(event);
                    }
                });
            });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
