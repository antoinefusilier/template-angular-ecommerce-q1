import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type Direction = 'ltr'|'rtl';

@Injectable({
    providedIn: 'root'
})
export class DirectionService {
    private direction: Direction = 'ltr';

    get value(): Direction {
        return this.direction;
    }

    set value(value: Direction) {
        this.direction = value;

        if (isPlatformBrowser(this.platformId)) {
            document.dir = this.direction;
        }
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.direction = getComputedStyle(document.body).direction as Direction;
        }
    }

    // noinspection JSUnusedGlobalSymbols
    isLTR(): boolean {
        return this.value === 'ltr';
    }

    isRTL(): boolean {
        return this.value === 'rtl';
    }
}
