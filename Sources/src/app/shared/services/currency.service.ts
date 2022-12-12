import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CurrencyFormatOptions } from '../interfaces/currency-format-options';

interface CurrencyServiceData {
    options: CurrencyFormatOptions;
}

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {
    private data: CurrencyServiceData = {
        options: {}
    };

    private changesSubject$: Subject<CurrencyFormatOptions> = new Subject();

    changes$: Observable<CurrencyFormatOptions> = this.changesSubject$.asObservable();

    get options(): CurrencyFormatOptions {
        return this.data.options;
    }
    set options(value: CurrencyFormatOptions) {
        this.data.options = value;
        this.changesSubject$.next(value);
    }

    constructor() { }
}
