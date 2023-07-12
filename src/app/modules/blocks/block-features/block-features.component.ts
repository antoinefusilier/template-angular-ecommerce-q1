import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-block-features',
    templateUrl: './block-features.component.html',
    styleUrls: ['./block-features.component.scss']
})
export class BlockFeaturesComponent {
    @Input() layout: 'classic'|'boxed' = 'classic';

    constructor() { }
}
