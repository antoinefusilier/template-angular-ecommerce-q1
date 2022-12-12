import { Directive, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * This directive helps to solve issue related to "iOS hover emulation" when first click
 */
@Directive({
    selector: '[appClick]'
})
export class ClickDirective implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();

    private get element(): HTMLElement {
        return this.el.nativeElement;
    }

    constructor(
        private el: ElementRef,
        private zone: NgZone
    ) { }

    ngOnInit(): void {
        let clicked = false;
        let identifier: number|null = null;
        let x: number|null = null;
        let y: number|null = null;

        this.zone.runOutsideAngular(() => {
            fromEvent<TouchEvent>(this.element, 'touchstart').pipe(takeUntil(this.destroy$)).subscribe(event => {
                if (event.touches.length !== 1) {
                    return;
                }

                const touch = event.changedTouches[0];

                clicked = true;
                identifier = touch.identifier;
                x = touch.clientX;
                y = touch.clientY;

                setTimeout(() => {
                    clicked = false;
                    identifier = x = y = null;
                }, 300);
            });
            fromEvent<TouchEvent>(this.element, 'touchend').pipe(takeUntil(this.destroy$)).subscribe(event => {
                if (clicked && event.changedTouches.length === 1 && event.changedTouches[0].identifier === identifier && x && y) {
                    const touch = event.changedTouches[0];
                    const distance = Math.abs(Math.sqrt(
                        Math.pow(x - touch.clientX, 2) +
                        Math.pow(y - touch.clientY, 2)
                    ));

                    if (distance < 15) {
                        event.preventDefault();
                        this.element.click();
                    }
                }

                clicked = false;
                identifier = x = y = null;
            });
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
