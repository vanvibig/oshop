import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../../shared/models/order';
import {Subscription} from 'rxjs';
import {ShoppingCartService} from '../../../shared/services/shopping-cart.service';
import {OrderService} from '../../../shared/services/order.service';
import {AuthService} from '../../../shared/services/auth.service';
import {ShoppingCart} from '../../../shared/models/shopping-cart';
import {Router} from '@angular/router';

@Component({
    selector: 'app-shipping-form',
    templateUrl: './shipping-form.component.html',
    styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
    @Input('cart') cart: ShoppingCart;
    shipping = {};
    userId: string;
    userSubscription: Subscription;

    constructor(
        private cartService: ShoppingCartService,
        private authService: AuthService,
        private orderService: OrderService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.userSubscription = this.authService.user$.subscribe(
            user => this.userId = user.uid
        );
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    async placeOrder() {
        let order = new Order(this.userId, this.shipping, this.cart);
        let result = await this.orderService.placeOrder(order);
        this.router.navigate(['/order-success', result.key]);
    }

}
