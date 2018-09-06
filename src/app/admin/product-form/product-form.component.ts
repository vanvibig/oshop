import {Observable} from 'rxjs';
import {CategoryService} from './../../category.service';
import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {ProductService} from '../../product.service';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
    categories$;
    keys = [];

    constructor(
        private categoryService: CategoryService,
        private productService: ProductService
    ) {
        this.categories$ = categoryService.getCategories();
        categoryService.getCategoriesKey().subscribe(res => {
            this.keys = res;
        });
    }

    ngOnInit() {
    }

    save(product) {
        this.productService.create(product);
    }
}