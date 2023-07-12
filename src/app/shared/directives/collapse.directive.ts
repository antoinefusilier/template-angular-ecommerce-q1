import { ContentChild, Directive, ElementRef, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[appCollapseContent]'
})
export class CollapseContentDirective implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();

    get element(): HTMLElement {
        return this.el.nativeElement;
    }

    constructor(
        private el: ElementRef,
        private zone: NgZone
    ) { }

    ngOnInit(): void {
        this.zone.runOutsideAngular(() => {
            fromEvent<TransitionEvent>(this.element, 'transitionend').pipe(
                takeUntil(this.destroy$)
            ).subscribe(event => {
                if (event.propertyName === 'height') {
                    this.element.style.height = '';
                }
            });
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}


@Directive({
    selector: '[appCollapseItem]',
    exportAs: 'appCollapseItem'
})
export class CollapseItemDirective {
    @Input() appCollapseItem = '';

    get class(): string {
        return this.appCollapseItem;
    }

    get isOpen(): boolean {
        return this.element.classList.contains(this.class);
    }

    get element(): HTMLElement {
        return this.el.nativeElement;
    }

    @ContentChild(CollapseContentDirective) content: CollapseContentDirective|null = null;

    constructor(private el: ElementRef) { }

    toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open(): void {
        if (this.content) {
            const startHeight = this.content.element.getBoundingClientRect().height;

            this.element.classList.add(this.class);

            const endHeight = this.content.element.getBoundingClientRect().height;

            this.content.element.style.height = `${startHeight}px`;
            this.element.getBoundingClientRect(); // force reflow
            this.content.element.style.height = `${endHeight}px`;
        } else {
            this.element.classList.add(this.class);
        }
    }

    close(): void {
        if (this.content) {
            const startHeight = this.content.element.getBoundingClientRect().height;

            this.content.element.style.height = `${startHeight}px`;
            this.element.classList.remove(this.class);

            this.element.getBoundingClientRect(); // force reflow

            this.content.element.style.height = '';
        } else {
            this.element.classList.remove(this.class);
        }
    }
}


@Directive({
    selector: '[appCollapse]'
})
export class CollapseDirective {}
