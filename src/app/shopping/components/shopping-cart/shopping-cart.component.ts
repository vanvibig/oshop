import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../../shared/services/shopping-cart.service';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

    cart$;

    constructor(
        private cartService: ShoppingCartService
    ) {
    }

    async ngOnInit() {
        this.cart$ = await this.cartService.getCart();
    }


    clearCart() {
        this.cartService.clearCart();
    }

    clearProduct(productId: string) {
        this.cartService.clearProduct(productId);
    }
}
