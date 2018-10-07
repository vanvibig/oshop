import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {ShoppingCart} from '../models/shopping-cart';
import {Subscription} from 'rxjs';
import {OrderService} from '../order.service';
import {AuthService} from '../auth.service';
import {Order} from '../models/order';

@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
    shipping = {};
    cart: ShoppingCart;
    cartSubscription: Subscription;
    userId: string;
    userSubscription: Subscription;

    constructor(
        private cartService: ShoppingCartService,
        private orderService: OrderService,
        private authService: AuthService
    ) {
    }

    async ngOnInit() {
        let cart$ = await this.cartService.getCart();
        this.cartSubscription = cart$.subscribe(cart => this.cart = cart);

        this.userSubscription = this.authService.user$.subscribe(
            user => this.userId = user.uid
        );
    }

    ngOnDestroy(): void {
        this.cartSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    }

    placeOrder() {
        let order = new Order(this.userId, this.shipping, this.cart);
        this.orderService.storeOrder(order);
    }

}
