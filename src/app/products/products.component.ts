import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product';
import {switchMap} from 'rxjs/operators';
import {ShoppingCartService} from '../shopping-cart.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

    products: Product[] = [];
    filteredProducts: Product[] = [];
    category: string;
    cart: any;
    cartSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: ShoppingCartService
    ) {
        this.productService.getAllDetail().pipe(
            switchMap(
                (products: Product[]) => {
                    this.products = products;

                    return this.route.queryParamMap;
                }
            )
        ).subscribe(
            (params) => {
                this.category = params.get('category');
                this.filteredProducts = (this.category) ?
                    this.products.filter(p => p.category === this.category) :
                    this.products;
            }
        );
    }

    async ngOnInit() {
        const cart = await this.cartService.getCart();
        this.cartSubscription = cart.valueChanges().subscribe(
            res => {
                this.cart = res;
            }
        );
    }

    ngOnDestroy(): void {
        this.cartSubscription.unsubscribe();
    }

}
