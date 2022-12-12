import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// modules (third-party)
import { NgxSliderModule } from '@angular-slider/ngx-slider';

// modules
import { SharedModule } from '../../shared/shared.module';

// widgets
import { WidgetAboutusComponent } from './widget-aboutus/widget-aboutus.component';
import { WidgetCategoriesComponent } from './widget-categories/widget-categories.component';
import { WidgetCommentsComponent } from './widget-comments/widget-comments.component';
import { WidgetFiltersComponent } from './widget-filters/widget-filters.component';
import { WidgetNewsletterComponent } from './widget-newsletter/widget-newsletter.component';
import { WidgetPostsComponent } from './widget-posts/widget-posts.component';
import { WidgetProductsComponent } from './widget-products/widget-products.component';
import { WidgetSearchComponent } from './widget-search/widget-search.component';
import { WidgetTagsComponent } from './widget-tags/widget-tags.component';

@NgModule({
    declarations: [
        // widgets
        WidgetAboutusComponent,
        WidgetCategoriesComponent,
        WidgetCommentsComponent,
        WidgetFiltersComponent,
        WidgetNewsletterComponent,
        WidgetPostsComponent,
        WidgetProductsComponent,
        WidgetSearchComponent,
        WidgetTagsComponent
    ],
    imports: [
        // modules (angular)
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // modules (third-party)
        NgxSliderModule,
        // modules
        SharedModule
    ],
    exports: [
        // widgets
        WidgetAboutusComponent,
        WidgetCategoriesComponent,
        WidgetCommentsComponent,
        WidgetFiltersComponent,
        WidgetNewsletterComponent,
        WidgetPostsComponent,
        WidgetProductsComponent,
        WidgetSearchComponent,
        WidgetTagsComponent
    ]
})
export class WidgetsModule { }
