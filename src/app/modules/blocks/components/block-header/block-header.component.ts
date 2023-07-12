import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlockHeaderGroup } from '../../../../shared/interfaces/block-header-group';

@Component({
    selector: 'app-block-header',
    templateUrl: './block-header.component.html',
    styleUrls: ['./block-header.component.scss']
})
export class BlockHeaderComponent {
    @Input() header = '';
    @Input() arrows = false;
    @Input() groups: BlockHeaderGroup[] = [];

    @Output() next: EventEmitter<any> = new EventEmitter();
    @Output() prev: EventEmitter<any> = new EventEmitter();

    @Output() groupChange: EventEmitter<BlockHeaderGroup> = new EventEmitter();

    constructor() { }

    setGroup(group: BlockHeaderGroup): void {
        this.groups.forEach(g => g.current = g === group);
        this.groupChange.emit(group);
    }
}
