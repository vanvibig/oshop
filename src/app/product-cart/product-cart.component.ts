import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../models/product';
import {ShoppingCartService} from '../shopping-cart.service';

@Component({
    selector: 'app-product-cart',
    templateUrl: './product-cart.component.html',
    styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

    @Input('product') product: Product;
    @Input('showAction') showAction = true;

    constructor(
        private cartService: ShoppingCartService
    ) {
    }

    ngOnInit() {
    }

    addToCart(product: Product) {
        this.cartService.addToCart(product);
    }

}
