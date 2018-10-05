import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {User} from '../models/user';
import {ShoppingCartService} from '../shopping-cart.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'bs-navbar',
    templateUrl: './bs-navbar.component.html',
    styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {

    userModel: User;
    shoppingCartItemCount: number;
    cartSubscription: Subscription;

    constructor(
        private authService: AuthService,
        private cartService: ShoppingCartService
    ) {
        authService.userModel$.subscribe(
            userModel => this.userModel = userModel
        );
    }

    logout() {
        this.authService.logout();
    }

    async ngOnInit() {
        const cart$ = await this.cartService.getCart();
        this.cartSubscription = cart$.valueChanges().subscribe(
            (cart) => {
                this.shoppingCartItemCount = 0;
                for (const productId in cart.items) {
                    if (productId) { // required by ts
                        this.shoppingCartItemCount += cart.items[productId].quantity;
                    }
                }
            }
        );
    }

    ngOnDestroy() {
        this.cartSubscription.unsubscribe();
    }


}
