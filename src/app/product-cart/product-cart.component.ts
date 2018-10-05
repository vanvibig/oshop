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
    @Input('shoppingCart') shoppingCart;

    constructor(
        private cartService: ShoppingCartService
    ) {
    }

    ngOnInit() {
    }

    addToCart() {
        this.cartService.addToCart(this.product);
    }

    removeFromCart() {
        this.cartService.removeFromCart(this.product);
    }

    getQuantity() {
        if (!this.shoppingCart) {
            return 0;
        }
        const item = this.shoppingCart.items[this.product.id];
        return item ? item.quantity : 0;
    }
}
