import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
    id!: string;
    width: string|null = null;
    height: string|null = null;

    @Input() set name(value: string) {
        this.id = value;
    }

    @Input() set size(value: string) {
        const result = /^([0-9]+)(?:x([0-9]+))?$/.exec(value);

        if (result) {
            if (result[2]) {
                this.width = result[1] + 'px';
                this.height = result[2] + 'px';
            } else {
                this.width = this.height = result[1] + 'px';
            }
        } else {
            this.width = this.height = null;
        }
    }

    constructor() { }
}
