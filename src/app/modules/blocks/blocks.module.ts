import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';

// modules
import { SharedModule } from '../../shared/shared.module';

// blocks
import { BlockBannerComponent } from './block-banner/block-banner.component';
import { BlockBrandsComponent } from './block-brands/block-brands.component';
import { BlockCategoriesComponent } from './block-categories/block-categories.component';
import { BlockFeaturesComponent } from './block-features/block-features.component';
import { BlockMapComponent } from './block-map/block-map.component';
import { BlockPostsComponent } from './block-posts/block-posts.component';
import { BlockProductColumnsComponent } from './block-product-columns/block-product-columns.component';
import { BlockProductColumnsItemComponent } from './block-product-columns/block-product-columns-item/block-product-columns-item.component';
import { BlockProductsCarouselComponent } from './block-products-carousel/block-products-carousel.component';
import { BlockProductsComponent } from './block-products/block-products.component';
import { BlockSlideshowComponent } from './block-slideshow/block-slideshow.component';

// components
import { BlockHeaderComponent } from './components/block-header/block-header.component';

@NgModule({
    declarations: [
        // blocks
        BlockBannerComponent,
        BlockBrandsComponent,
        BlockCategoriesComponent,
        BlockFeaturesComponent,
        BlockMapComponent,
        BlockPostsComponent,
        BlockProductColumnsComponent,
        BlockProductColumnsItemComponent,
        BlockProductsCarouselComponent,
        BlockProductsComponent,
        BlockSlideshowComponent,
        // components
        BlockHeaderComponent
    ],
    imports: [
        // modules (angular)
        CommonModule,
        RouterModule,
        // modules (third-party)
        CarouselModule,
        // modules
        SharedModule
    ],
    exports: [
        // blocks
        BlockBannerComponent,
        BlockBrandsComponent,
        BlockCategoriesComponent,
        BlockFeaturesComponent,
        BlockMapComponent,
        BlockPostsComponent,
        BlockProductColumnsComponent,
        BlockProductColumnsItemComponent,
        BlockProductsCarouselComponent,
        BlockProductsComponent,
        BlockSlideshowComponent
    ]
})
export class BlocksModule { }
