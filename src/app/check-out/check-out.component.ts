import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {ShoppingCart} from '../models/shopping-cart';
import {Subscription} from 'rxjs';
import {OrderService} from '../order.service';

@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
    shipping = {};
    private cart: ShoppingCart;
    subscription: Subscription;

    constructor(
        private cartService: ShoppingCartService,
        private orderService: OrderService
    ) {
    }

    async ngOnInit() {
        let cart$ = await this.cartService.getCart();
        this.subscription = cart$.subscribe(cart => this.cart = cart);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    placeOrder() {
        let order = {
            datePlaced: new Date().getTime(),
            shipping: this.shipping,
            items: this.cart.items.map(
                item => {
                    return {
                        product: {
                            title: item.title,
                            imageUrl: item.imageUrl,
                            price: item.price
                        },
                        quantity: item.quantity,
                        totalPrice: item.totalPrice
                    }
                }
            )
        };
        this.orderService.storeOrder(order);
    }

}
