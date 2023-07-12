import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { HttpClient } from '@angular/common/http';
import { getBlogCategoriesTree } from '../../../fake-server';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    // noinspection JSUnusedLocalSymbols
    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Returns a category tree.
     *
     * @param parent - If a parent is specified then its descendants will be returned.
     * @param depth  - Maximum depth of category tree.
     */
    getCategories(parent: Partial<Category>|null = null, depth: number = 0): Observable<Category[]> {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/blog/categories.json?parent=latest-news&depth=1
         *
         * where:
         * - parent = parent.slug
         * - depth  = depth
         */
        // const params: {[param: string]: string} = {
        //     parent: parent.slug,
        //     depth,
        // };
        //
        // return this.http.get<Category[]>('https://example.com/api/blog/categories.json', {params});

        // This is for demonstration purposes only. Remove it and use the code above.
        return getBlogCategoriesTree(parent ? parent.slug : null, depth);
    }
}
