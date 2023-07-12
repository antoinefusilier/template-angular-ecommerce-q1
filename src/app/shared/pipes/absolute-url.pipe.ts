import { Inject, Pipe, PipeTransform, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

export type AbsoluteUrlScope = 'angular' | 'html';

@Pipe({
    name: 'absoluteUrl',
})
export class AbsoluteUrlPipe implements PipeTransform {
    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    transform(value: string, scope: AbsoluteUrlScope = 'html'): string {
        if (!value || !isPlatformBrowser(this.platformId)) {
            return value;
        }

        if (scope === 'angular') {
            value = this.router.createUrlTree([value], {relativeTo: this.route}).toString().substr(1);
        }

        const a = document.createElement('a');

        a.href = value;

        return a.href;
    }
}
