import {
    AfterViewChecked, AfterViewInit,
    Component,
    ElementRef,
    Inject, NgZone,
    OnDestroy,
    OnInit,
    PLATFORM_ID, QueryList,
    Renderer2, ViewChild, ViewChildren
} from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { departments } from '../../../../../data/header-departments';
import { NavigationLink } from '../../../../shared/interfaces/navigation-link';
import { isPlatformBrowser } from '@angular/common';
import { HeaderService } from '../../../../shared/services/header.service';
import { fromMatchMedia } from '../../../../shared/functions/rxjs/fromMatchMedia';
import { fromOutsideTouchClick } from '../../../../shared/functions/rxjs/fromOutsideTouchClick';

@Component({
    selector: 'app-header-departments',
    templateUrl: './departments.component.html',
    styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
    private destroy$: Subject<void> = new Subject();

    @ViewChild('bodyElement') bodyElementRef!: ElementRef;
    @ViewChild('containerElement') containerElementRef!: ElementRef;
    @ViewChildren('submenuElement') submenuElements!: QueryList<ElementRef>;
    @ViewChildren('itemElement') itemElements!: QueryList<ElementRef>;

    items: NavigationLink[] = departments;
    hoveredItem: NavigationLink|null = null;

    isOpen = false;
    fixed = false;
    fixedHeight: number|null = null;

    reCalcSubmenuPosition = false;

    private get element(): HTMLElement {
        return this.el.nativeElement;
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private renderer: Renderer2,
        private el: ElementRef,
        private header: HeaderService,
        private zone: NgZone,
    ) { }

    ngOnInit(): void {
        const root = this.element.querySelector('.departments') as HTMLElement;
        const content = this.element.querySelector('.departments__links-wrapper') as HTMLElement;

        merge(
            this.header.navPanelPositionState$,
            this.header.navPanelVisibility$,
        ).pipe(takeUntil(this.destroy$)).subscribe(() => {
            if (this.header.navPanelPosition === 'static' && this.header.departmentsArea !== null) {
                this.open(true);
            } else if (this.isOpen) {
                this.close(true);
            }
        });

        this.header.departmentsArea$.pipe(takeUntil(this.destroy$)).subscribe(areaElement => {
            if (areaElement) {
                this.fixed = true;
                this.isOpen = true;

                if (isPlatformBrowser(this.platformId)) {
                    setTimeout(() => {
                        this.fix();
                    }, 0);
                } else {
                    this.renderer.addClass(root, 'departments--fixed');
                    this.renderer.addClass(root, 'departments--open');
                }
            } else {
                this.fixed = false;
                this.isOpen = false;

                if (isPlatformBrowser(this.platformId)) {
                    root.classList.remove('departments--open', 'departments--fixed');
                    content.style.maxHeight = '';
                    content.style.height = '';
                    content.style.transition = 'none';
                    content.getBoundingClientRect(); // force reflow
                    content.style.transition = '';
                } else {
                    this.renderer.removeClass(root, 'departments--fixed');
                    this.renderer.removeClass(root, 'departments--open');
                }
            }
        });

        if (isPlatformBrowser(this.platformId)) {
            window.addEventListener('load', () => {
                if (!this.header.departmentsArea) {
                    return;
                }

                const areaBottom = this.getAreaBottom();
                const fixedHeight = areaBottom - (content.getBoundingClientRect().top + window.scrollY);

                if (this.fixedHeight === fixedHeight) {
                    return;
                }

                root.classList.remove('departments--open', 'departments--fixed');
                content.style.height = '';
                content.style.transition = 'none';
                content.getBoundingClientRect(); // force reflow

                this.fix();

                content.style.transition = '';
            });

            fromEvent<MouseEvent>(document, 'mousedown').pipe(
                takeUntil(this.destroy$)
            ).subscribe((event) => {
                if (event.target instanceof HTMLElement && !this.element.contains(event.target)) {
                    this.close();
                }
            });

            fromEvent<TransitionEvent>(content, 'transitionend').pipe(
                takeUntil(this.destroy$)
            ).subscribe((event) => {
                if (event.propertyName === 'height') {
                    root.classList.remove('departments--transition');
                }
            });

            fromMatchMedia('(min-width: 992px)').pipe(
                filter(x => x.matches && this.header.departmentsArea !== null),
                takeUntil(this.destroy$)
            ).subscribe(() => {
                this.fix();
            });
        }
    }

    getAreaBottom(): number {
        if (!this.header.departmentsArea) {
            throw new Error('Departments area is null.');
        }

        const areaRect = this.header.departmentsArea.getBoundingClientRect();

        return areaRect.top + areaRect.height + window.scrollY;
    }

    fix(): void {
        const root = this.element.querySelector('.departments') as HTMLElement;
        const content = this.element.querySelector('.departments__links-wrapper') as HTMLElement;
        const areaBottom = this.getAreaBottom();

        root.classList.remove('departments--transition');
        root.classList.add('departments--fixed', 'departments--open');

        this.fixedHeight = areaBottom - (content.getBoundingClientRect().top + window.scrollY);

        content.style.maxHeight = `${this.fixedHeight}px`;
        content.style.height = `${this.fixedHeight}px`;
        content.getBoundingClientRect(); // force reflow
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                fromOutsideTouchClick(this.element).pipe(
                    takeUntil(this.destroy$)
                ).subscribe(() => {
                    if (this.isOpen) {
                        this.zone.run(() => this.close());
                    }
                });
            });
        }
    }

    toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open(immediately = false): void {
        this.isOpen = true;

        const root = this.element.querySelector('.departments') as HTMLElement;
        const content = root.querySelector('.departments__links-wrapper') as HTMLElement;

        if (immediately) {
            root.classList.add('departments--open');

            const documentHeight = document.documentElement.clientHeight;
            const paddingBottom = 20;
            const contentRect = content.getBoundingClientRect();
            const areaBottom = this.getAreaBottom();
            const endHeight = this.header.departmentsArea
                ? areaBottom - (contentRect.top + window.scrollY)
                : Math.min(contentRect.height, documentHeight - paddingBottom - contentRect.top);

            content.style.maxHeight = endHeight + 'px';
            content.style.height = endHeight + 'px';
            content.style.transition = 'none';

            content.getBoundingClientRect(); // force reflow

            content.style.transition = '';
        } else {
            const startHeight = content.getBoundingClientRect().height;

            root.classList.add('departments--transition', 'departments--open');

            const documentHeight = document.documentElement.clientHeight;
            const paddingBottom = 20;
            const contentRect = content.getBoundingClientRect();
            const endHeight = Math.min(contentRect.height, documentHeight - paddingBottom - contentRect.top);

            content.style.height = startHeight + 'px';
            content.getBoundingClientRect(); // force reflow
            content.style.maxHeight = endHeight + 'px';
            content.style.height = endHeight + 'px';
        }
    }

    close(immediately = false): void {
        if ((this.fixed && this.header.navPanelPosition === 'static') || !this.isOpen) {
            return;
        }

        this.isOpen = false;

        const root = this.element.querySelector('.departments') as HTMLElement;
        const content = root.querySelector('.departments__links-wrapper') as HTMLElement;

        if (immediately) {
            root.classList.remove('departments--open');

            content.style.transition = 'none';
            content.style.height = '';
            content.style.maxHeight = '';

            content.getBoundingClientRect(); // force reflow

            content.style.transition = '';
        } else {
            content.style.height = content.getBoundingClientRect().height + 'px';

            root.classList.add('departments--transition');
            root.classList.remove('departments--open');

            content.getBoundingClientRect(); // force reflow

            content.style.height = '';
            content.style.maxHeight = '';
        }

        this.hoveredItem = null;
    }

    onItemMouseEnter(item: NavigationLink): void {
        if (this.hoveredItem !== item) {
            this.hoveredItem = item;

            if (item.menu) {
                this.reCalcSubmenuPosition = true;
            }
        }
    }

    onMouseLeave(): void {
        this.hoveredItem = null;
    }

    onTouchClick(event: Event, item: NavigationLink): void {
        if (event.cancelable) {
            if (this.hoveredItem && this.hoveredItem === item) {
                return;
            }

            if (item.menu) {
                event.preventDefault();

                this.hoveredItem = item;
                this.reCalcSubmenuPosition = true;
            }
        }
    }

    onItemClick(): void {
        this.close();
    }

    onSubItemClick(): void {
        this.close();
        this.hoveredItem = null;
    }

    ngAfterViewChecked(): void {
        if (!this.reCalcSubmenuPosition) {
            return;
        }

        this.reCalcSubmenuPosition = false;

        const itemElement = this.getCurrentItemElement();
        const submenuElement = this.getCurrentSubmenuElement();

        if (!itemElement || !submenuElement) {
            return;
        }

        const viewportHeight = window.innerHeight;
        const paddingBottom = 20;

        if (this.hoveredItem?.menu?.type === 'megamenu') {
            const submenuTop = submenuElement.getBoundingClientRect().top;

            submenuElement.style.maxHeight = `${viewportHeight - submenuTop - paddingBottom}px`;
        }

        if (this.hoveredItem?.menu?.type === 'menu') {
            const bodyElement = this.bodyElementRef.nativeElement as HTMLDivElement;
            const containerElement = this.containerElementRef.nativeElement as HTMLDivElement;
            const bodyRect = bodyElement.getBoundingClientRect();

            const maxHeight = viewportHeight - paddingBottom - Math.min(
                paddingBottom,
                bodyRect.top
            );

            submenuElement.style.maxHeight = `${maxHeight}px`;

            const submenuRect = submenuElement.getBoundingClientRect();
            const itemRect = itemElement.getBoundingClientRect();
            const containerRect = containerElement.getBoundingClientRect();
            const top = Math.min(itemRect.top, viewportHeight - paddingBottom - submenuRect.height) - containerRect.top;

            submenuElement.style.top = `${top}px`;
        }
    }

    getCurrentItemElement(): HTMLDivElement|null {
        if (!this.hoveredItem) {
            return null;
        }

        const index = this.items.indexOf(this.hoveredItem);
        const elements = this.itemElements.toArray();

        if (index === -1 || !elements[index]) {
            return null;
        }

        return elements[index].nativeElement as HTMLDivElement;
    }

    getCurrentSubmenuElement(): HTMLDivElement|null {
        if (!this.hoveredItem) {
            return null;
        }

        const index = this.items.filter(x => x.menu).indexOf(this.hoveredItem);
        const elements = this.submenuElements.toArray();

        if (index === -1 || !elements[index]) {
            return null;
        }

        return elements[index].nativeElement as HTMLDivElement;
    }
}
