import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../product.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

    products: any[];
    filterdProducts: any[];
    subscription: Subscription;

    constructor(
        private productService: ProductService
    ) {
        this.subscription = this.productService.getAll().subscribe(
            (products: any[]) => {
                this.filterdProducts = this.products = products;
            }
        );
    }

    filter(query: string) {
        this.filterdProducts = (query) ?
            this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) :
            this.products;
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
