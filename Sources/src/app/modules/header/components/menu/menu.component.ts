import {
    AfterViewChecked,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { NestedLink } from '../../../../shared/interfaces/nested-link';
import { DirectionService } from '../../../../shared/services/direction.service';

@Component({
    selector: 'app-header-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewChecked {
    @Input() layout: 'classic'|'topbar' = 'classic';
    @Input() items: NestedLink[] = [];

    @Output() itemClick: EventEmitter<NestedLink> = new EventEmitter<NestedLink>();

    @ViewChild('menuElement') elementRef!: ElementRef;
    @ViewChildren('submenuElement') submenuElements!: QueryList<ElementRef>;
    @ViewChildren('itemElement') itemElements!: QueryList<ElementRef>;

    hoveredItem: NestedLink|null = null;
    reCalcSubmenuPosition = false;

    get element(): HTMLDivElement {
        return this.elementRef.nativeElement;
    }

    constructor(
        private direction: DirectionService
    ) { }

    onItemMouseEnter(item: NestedLink): void {
        if (this.hoveredItem !== item) {
            this.hoveredItem = item;

            if (item.items) {
                this.reCalcSubmenuPosition = true;
            }
        }
    }

    onMouseLeave(): void {
        this.hoveredItem = null;
    }

    onTouchClick(event: Event, item: NestedLink): void {
        if (event.cancelable) {
            if (this.hoveredItem && this.hoveredItem === item) {
                return;
            }

            if (item.items) {
                event.preventDefault();

                this.hoveredItem = item;
                this.reCalcSubmenuPosition = true;
            }
        }
    }

    onSubItemClick(item: NestedLink): void {
        this.hoveredItem = null;
        this.itemClick.emit(item);
    }

    ngAfterViewChecked(): void {
        if (!this.reCalcSubmenuPosition) {
            return;
        }

        this.reCalcSubmenuPosition = false;

        const itemElement = this.getCurrentItemElement();
        const submenuElement = this.getCurrentSubmenuElement();

        if (!submenuElement || !itemElement) {
            return;
        }

        const menuRect = this.element.getBoundingClientRect();
        const itemRect = itemElement.getBoundingClientRect();
        const submenuRect = submenuElement.getBoundingClientRect();

        const viewportHeight = window.innerHeight;
        const paddingY = 20;
        const paddingBottom = Math.min(viewportHeight - itemRect.bottom, paddingY);
        const maxHeight = viewportHeight - paddingY - paddingBottom;

        submenuElement.style.maxHeight = `${maxHeight}px`;

        const submenuHeight = submenuElement.getBoundingClientRect().height;
        const position = Math.min(
            Math.max(
                itemRect.top - menuRect.top,
                0
            ),
            (viewportHeight - paddingBottom - submenuHeight) - menuRect.top
        );

        submenuElement.style.top = `${position}px`;

        if (this.direction.isRTL()) {
            const submenuLeft = menuRect.left - submenuRect.width;

            submenuElement.classList.toggle('menu__submenu--reverse', submenuLeft < 0);
        } else {
            const submenuRight = menuRect.left + menuRect.width + submenuRect.width;

            submenuElement.classList.toggle('menu__submenu--reverse', submenuRight > document.body.clientWidth);
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

        const index = this.items.filter(x => x.items).indexOf(this.hoveredItem);
        const elements = this.submenuElements.toArray();

        if (index === -1 || !elements[index]) {
            return null;
        }

        return elements[index].nativeElement as HTMLDivElement;
    }
}
