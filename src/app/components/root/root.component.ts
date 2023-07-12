import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropcartType } from '../../modules/header/components/dropcart/dropcart.component';

interface RouterData {
    headerLayout?: 'classic'|'compact';
    dropcartType?: DropcartType;
}

@Component({
    selector: 'app-main',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent {
    headerLayout: 'classic'|'compact' = 'classic';
    dropcartType: DropcartType = 'dropdown';

    constructor(
        public route: ActivatedRoute
    ) {
        this.route.data.subscribe((data: RouterData) => {
            this.headerLayout = data.headerLayout || 'classic';
            this.dropcartType = data.dropcartType || 'dropdown';
        });
    }
}
