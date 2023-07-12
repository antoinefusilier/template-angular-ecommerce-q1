import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class ShopSidebarService {
    private isOpenSubject$: Subject<boolean> = new Subject();

    isOpen$: Observable<boolean> = this.isOpenSubject$.asObservable();

    constructor() { }

    open(): void {
        this.isOpenSubject$.next(true);
    }

    close(): void {
        this.isOpenSubject$.next(false);
    }
}
