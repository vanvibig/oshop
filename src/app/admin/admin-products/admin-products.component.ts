import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../product.service';
import {Subscription} from 'rxjs';
import {Product} from '../../models/product';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

    products: Product[];
    filterdProducts: any[];
    subscription: Subscription;

    constructor(
        private productService: ProductService
    ) {
        this.subscription = this.productService.getAll()
            .subscribe(
            (products) => {
                this.filterdProducts = this.products = products.map((product: any) => {
                    return new Product(
                        product.key,
                        product.data.title,
                        product.data.price,
                        product.data.category,
                        product.data.imageUrl);
                });
            }
        );
    }

    filter(query: string) {
        this.filterdProducts = (query) ?
            this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
            this.products;
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
