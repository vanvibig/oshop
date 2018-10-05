import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {User} from '../models/user';
import {ShoppingCartService} from '../shopping-cart.service';
import {Observable, Subscription} from 'rxjs';
import {ShoppingCart} from '../models/shopping-cart';

@Component({
    selector: 'bs-navbar',
    templateUrl: './bs-navbar.component.html',
    styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {

    userModel: User;
    cartSubscription: Subscription;
    cart$: any;

    constructor(
        private authService: AuthService,
        private cartService: ShoppingCartService
    ) {

    }

    logout() {
        this.authService.logout();
    }

    async ngOnInit() {
        this.authService.userModel$.subscribe(
            userModel => this.userModel = userModel
        );

        this.cart$ = await this.cartService.getCart();
    }

    ngOnDestroy() {
        this.cartSubscription.unsubscribe();
    }


}
