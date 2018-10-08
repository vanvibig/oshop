import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {ShoppingCart} from '../../models/shopping-cart';

@Component({
    selector: 'app-product-cart',
    templateUrl: './product-cart.component.html',
    styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

    @Input('product') product: Product;
    @Input('showAction') showAction = true;
    @Input('shoppingCart') shoppingCart: ShoppingCart;

    constructor(
        private cartService: ShoppingCartService
    ) {
    }

    ngOnInit() {
    }

    addToCart() {
        this.cartService.addToCart(this.product);
    }
}
