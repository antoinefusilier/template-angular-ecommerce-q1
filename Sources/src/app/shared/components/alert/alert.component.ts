import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
    @Input() size: 'lg'|null = null;
    @Input() dismissible = false;
    @Input() type: 'info'|'primary'|'secondary'|'success'|'danger'|'warning' = 'info';

    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() close: EventEmitter<void> = new EventEmitter();

    @HostBinding('class.alert') classAlert = true;
    @HostBinding('class.alert-lg') get classAlertLg(): boolean { return this.size === 'lg'; }
    @HostBinding('class.alert-dismissible') get classAlertDismissible(): boolean { return this.dismissible; }
    @HostBinding('class.alert-info') get classAlertInfo(): boolean { return this.type === 'info'; }
    @HostBinding('class.alert-primary') get classAlertPrimary(): boolean { return this.type === 'primary'; }
    @HostBinding('class.alert-secondary') get classAlertSecondary(): boolean { return this.type === 'secondary'; }
    @HostBinding('class.alert-success') get classAlertSuccess(): boolean { return this.type === 'success'; }
    @HostBinding('class.alert-danger') get classAlertDanger(): boolean { return this.type === 'danger'; }
    @HostBinding('class.alert-warning') get classAlertWarning(): boolean { return this.type === 'warning'; }

    constructor() { }

    onClose(): void {
        this.close.emit();
    }
}
