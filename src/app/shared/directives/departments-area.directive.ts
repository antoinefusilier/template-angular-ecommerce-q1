import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service';

@Directive({
    selector: '[appDepartmentsArea]'
})
export class DepartmentsAreaDirective implements OnInit, OnDestroy {
    get element(): HTMLElement {
        return this.el.nativeElement;
    }

    constructor(
        private el: ElementRef,
        private header: HeaderService,
    ) { }

    ngOnInit(): void {
        this.header.departmentsArea = this.element;
    }

    ngOnDestroy(): void {
        this.header.departmentsArea = null;
    }
}
