import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {CategoryService} from '../category.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    products: Product[] = [];
    filteredProducts: Product[] = [];
    categories$;
    category: string;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private categoryService: CategoryService
    ) {
        this.categories$ = this.categoryService.getAllCategories();

        this.productService.getAllDetail().subscribe(
            (products: Product[]) => {
                this.products = products;

                this.route.queryParamMap.subscribe(
                    (params) => {
                        this.category = params.get('category');
                        this.filteredProducts = (this.category) ?
                            this.products.filter(p => p.category === this.category) :
                            this.products;
                    }
                );
            }
        );
    }

    ngOnInit() {
    }

}
