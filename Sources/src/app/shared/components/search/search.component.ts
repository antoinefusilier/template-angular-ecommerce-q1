import {
    Component,
    ElementRef, EventEmitter,
    HostBinding,
    Inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit, Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { Product } from '../../interfaces/product';
import { RootService } from '../../services/root.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, map, switchMap, takeUntil, throttleTime } from 'rxjs/operators';
import { fromEvent, of, Subject, asyncScheduler } from 'rxjs';
import { ShopService } from '../../api/shop.service';
import { Category } from '../../interfaces/category';
import { DOCUMENT } from '@angular/common';
import { CartService } from '../../services/cart.service';

export type SearchLocation = 'header' | 'indicator' | 'mobile-header';

export type CategoryWithDepth = Category & {depth: number};

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    exportAs: 'search',
})
export class SearchComponent implements OnChanges, OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    form!: FormGroup;

    hasSuggestions = false;

    categories: CategoryWithDepth[] = [];

    suggestedProducts: Product[] = [];

    addedToCartProducts: Product[] = [];

    @Input() location: SearchLocation = 'header';

    @Output() escape: EventEmitter<void> = new EventEmitter<void>();

    @Output() closeButtonClick: EventEmitter<void> = new EventEmitter<void>();

    @HostBinding('class.search') classSearch = true;

    @HostBinding('class.search--location--header') get classSearchLocationHeader(): boolean { return this.location === 'header'; }

    @HostBinding('class.search--location--indicator') get classSearchLocationIndicator(): boolean { return this.location === 'indicator'; }

    @HostBinding('class.search--location--mobile-header') get classSearchLocationMobileHeader(): boolean { return this.location === 'mobile-header'; }

    @HostBinding('class.search--has-suggestions') get classSearchHasSuggestions(): boolean { return this.hasSuggestions; }

    @HostBinding('class.search--suggestions-open') classSearchSuggestionsOpen = false;

    @ViewChild('input') inputElementRef!: ElementRef;

    get element(): HTMLElement { return this.elementRef.nativeElement; }

    get inputElement(): HTMLElement { return this.inputElementRef.nativeElement; }

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private fb: FormBuilder,
        private elementRef: ElementRef,
        private zone: NgZone,
        private shop: ShopService,
        private cart: CartService,
        public root: RootService,
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['location'] && this.location === 'header') {
            this.shop.getCategories(null, 1).pipe(
                takeUntil(this.destroy$),
            ).subscribe(categories => this.categories = this.getCategoriesWithDepth(categories));
        }
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            category: ['all'],
            query: [''],
        });

        this.form.get('query')?.valueChanges.pipe(
            throttleTime(250, asyncScheduler, {leading: true, trailing: true}),
            map(query => query.trim()),
            switchMap(query => {
                if (query) {
                    const categorySlug = this.form.value.category !== 'all' ? this.form.value.category : null;

                    return this.shop.getSuggestions(query, 5, categorySlug);
                }

                return of([]);
            }),
            takeUntil(this.destroy$),
        ).subscribe(products => {
            this.hasSuggestions = products.length > 0;

            if (products.length > 0) {
                this.suggestedProducts = products;
            }
        });

        this.zone.runOutsideAngular(() => {
            fromEvent(this.document, 'click').pipe(
                takeUntil(this.destroy$),
            ).subscribe(event => {
                const activeElement = this.document.activeElement;

                // If the inner element still has focus, ignore the click.
                if (activeElement && activeElement.closest('.search') === this.element) {
                    return;
                }

                // Close suggestion if click performed outside of component.
                if (event.target instanceof HTMLElement && this.element !== event.target.closest('.search')) {
                    this.zone.run(() => this.closeSuggestion());
                }
            });

            fromEvent(this.element, 'focusout').pipe(
                debounceTime(10),
                takeUntil(this.destroy$),
            ).subscribe(() => {
                if (this.document.activeElement === this.document.body) {
                    return;
                }

                // Close suggestions if the focus received an external element.
                if (this.document.activeElement && this.document.activeElement.closest('.search') !== this.element) {
                    this.zone.run(() => this.closeSuggestion());
                }
            });
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    openSuggestion(): void {
        this.classSearchSuggestionsOpen = true;
    }

    closeSuggestion(): void {
        this.classSearchSuggestionsOpen = false;
    }

    getCategoryName(category: CategoryWithDepth): string {
        return '&nbsp;'.repeat(category.depth * 4) + category.name;
    }

    addToCart(product: Product): void {
        if (this.addedToCartProducts.includes(product)) {
            return;
        }

        this.addedToCartProducts.push(product);
        this.cart.add(product, 1).subscribe({
            complete: () => {
                this.addedToCartProducts = this.addedToCartProducts.filter(eachProduct => eachProduct !== product);
            }
        });
    }

    private getCategoriesWithDepth(categories: Category[], depth = 0): CategoryWithDepth[] {
        return categories.reduce<CategoryWithDepth[]>((acc, category) => [
            ...acc,
            {...category, depth},
            ...this.getCategoriesWithDepth(category.children || [], depth + 1),
        ], []);
    }
}
