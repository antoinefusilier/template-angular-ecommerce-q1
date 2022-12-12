import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type NavPanelPosition = 'static' | 'sticky';

export type NavPanelVisibility = 'hidden' | 'shown';

@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    private departmentsAreaValue: HTMLElement|null = null;
    private departmentsAreaSubject: BehaviorSubject<HTMLElement|null> = new BehaviorSubject<HTMLElement|null>(null);

    get departmentsArea(): HTMLElement|null {
        return this.departmentsAreaValue;
    }
    set departmentsArea(value: HTMLElement|null) {
        if (this.departmentsAreaValue !== value) {
            this.departmentsAreaValue = value;
            this.departmentsAreaSubject.next(value);
        }
    }

    departmentsArea$: Observable<HTMLElement|null> = this.departmentsAreaSubject.asObservable();


    private navPanelPositionValue: NavPanelPosition = 'static';
    private navPanelPositionSubject: BehaviorSubject<NavPanelPosition|null> = new BehaviorSubject<NavPanelPosition|null>(null);

    get navPanelPosition(): NavPanelPosition {
        return this.navPanelPositionValue;
    }
    set navPanelPosition(value: NavPanelPosition) {
        if (this.navPanelPositionValue !== value) {
            this.navPanelPositionValue = value;
            this.navPanelPositionSubject.next(value);
        }
    }

    navPanelPositionState$: Observable<NavPanelPosition|null> = this.navPanelPositionSubject.asObservable();


    private navPanelVisibilityValue: NavPanelVisibility = 'hidden';
    private navPanelVisibilitySubject: BehaviorSubject<NavPanelVisibility|null> = new BehaviorSubject<NavPanelVisibility|null>(null);

    get navPanelVisibility(): NavPanelVisibility {
        return this.navPanelVisibilityValue;
    }

    set navPanelVisibility(value: NavPanelVisibility) {
        if (this.navPanelVisibilityValue !== value) {
            this.navPanelVisibilityValue = value;
            this.navPanelVisibilitySubject.next(value);
        }
    }

    navPanelVisibility$: Observable<NavPanelVisibility|null> = this.navPanelVisibilitySubject.asObservable();
}
