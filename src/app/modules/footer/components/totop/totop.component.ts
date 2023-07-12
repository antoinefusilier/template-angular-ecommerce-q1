import { Component, HostBinding, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-totop',
    templateUrl: './totop.component.html',
    styleUrls: ['./totop.component.scss']
})
export class TotopComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    show = false;

    @HostBinding('class.totop') classTotop = true;

    @HostBinding('class.totop--show') get classTotopShow(): boolean { return this.show; }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private zone: NgZone,
    ) { }

    ngOnInit(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const showFrom = 300;

        this.zone.runOutsideAngular(() => {
            fromEvent(window, 'scroll', {passive: true}).pipe(
                takeUntil(this.destroy$),
            ).subscribe(() => {
                if (window.pageYOffset >= showFrom) {
                    if (!this.show) {
                        this.zone.run(() => this.show = true);
                    }
                } else {
                    if (this.show) {
                        this.zone.run(() => this.show = false);
                    }
                }
            });
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onClick(): void {
        try {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        } catch {
            window.scrollTo(0, 0);
        }
    }
}
