import { AfterViewChecked, Component, ElementRef, NgZone, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { navigation } from '../../../../../data/header-navigation';
import { NavigationLink } from '../../../../shared/interfaces/navigation-link';
import { DirectionService } from '../../../../shared/services/direction.service';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HeaderService } from '../../../../shared/services/header.service';

@Component({
    selector: 'app-header-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit, OnDestroy, AfterViewChecked {
    @ViewChildren('submenuElement') submenuElements!: QueryList<ElementRef>;
    @ViewChildren('itemElement') itemElements!: QueryList<ElementRef>;

    destroy$: Subject<void> = new Subject<void>();

    items: NavigationLink[] = navigation;
    hoveredItem: NavigationLink|null = null;

    reCalcSubmenuPosition = false;

    constructor(
        private direction: DirectionService,
        private header: HeaderService,
        private zone: NgZone,
    ) {}

    onItemMouseEnter(item: NavigationLink): void {
        if (this.hoveredItem !== item) {
            this.hoveredItem = item;

            if (item.menu) {
                this.reCalcSubmenuPosition = true;
            }
        }
    }

    onItemMouseLeave(item: NavigationLink): void {
        if (this.hoveredItem === item) {
            this.hoveredItem = null;
        }
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

    onOutsideTouchClick(item: NavigationLink): void {
        if (this.hoveredItem === item) {
            this.zone.run(() => this.hoveredItem = null);
        }
    }

    onSubItemClick(): void {
        this.hoveredItem = null;
    }

    ngOnInit(): void {
        merge(
            this.header.navPanelPositionState$,
            this.header.navPanelVisibility$,
        ).pipe(takeUntil(this.destroy$)).subscribe(() => this.hoveredItem = null);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
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

        const submenuTop = submenuElement.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        const paddingBottom = 20;

        submenuElement.style.maxHeight = `${viewportHeight - submenuTop - paddingBottom}px`;

        // calc megamenu position
        if (this.hoveredItem?.menu?.type !== 'megamenu') {
            return;
        }

        const container = submenuElement.offsetParent;

        if (!container) {
            return;
        }

        const containerWidth = container.getBoundingClientRect().width;
        const megamenuWidth = submenuElement.getBoundingClientRect().width;

        if (this.direction.isRTL()) {
            const itemPosition = containerWidth - (itemElement.offsetLeft + itemElement.offsetWidth);
            const megamenuPosition = Math.round(Math.min(itemPosition, containerWidth - megamenuWidth));

            submenuElement.style.right = megamenuPosition + 'px';
        } else {
            const itemPosition = itemElement.offsetLeft;
            const megamenuPosition = Math.round(Math.min(itemPosition, containerWidth - megamenuWidth));

            submenuElement.style.left = megamenuPosition + 'px';
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
