import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class MobileMenuService {
    private openSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    isOpen$: Observable<boolean> = this.openSubject$.asObservable();

    constructor(
        @Inject(PLATFORM_ID)
        private platformId: any
    ) { }

    open(): void {
        if (isPlatformBrowser(this.platformId)) {
            const bodyWidth = document.body.offsetWidth;

            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = (document.body.offsetWidth - bodyWidth) + 'px';

            this.openSubject$.next(true);
        }
    }

    close(): void {
        if (isPlatformBrowser(this.platformId)) {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '';

            this.openSubject$.next(false);
        }
    }

    toggle(): void {
        this.openSubject$.next(!this.openSubject$.value);
    }
}
