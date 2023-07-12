import { Directive, ElementRef, Inject, Input, OnDestroy, NgZone, PLATFORM_ID } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[appDropdown]',
    exportAs: 'appDropdown'
})
export class DropdownDirective implements OnDestroy {
    private destroy$: Subject<void> = new Subject();

    @Input() appDropdown = '';

    get isOpen(): boolean {
        return this.element.classList.contains(this.appDropdown);
    }

    private get element(): HTMLElement {
        return this.el.nativeElement;
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private el: ElementRef,
        private zone: NgZone
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                fromEvent<MouseEvent>(document, 'mousedown').pipe(
                    takeUntil(this.destroy$)
                ).subscribe((event) => {
                    if (!el.nativeElement.contains(event.target)) {
                        this.close();
                    }
                });
            });
        }
    }

    toggle(force?: boolean): void {
        this.element.classList.toggle(this.appDropdown, force);
    }

    close(): void {
        this.toggle(false);
    }

    open(): void {
        this.toggle(true);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
