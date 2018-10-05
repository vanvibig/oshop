import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from './models/product';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    constructor(
        private db: AngularFireDatabase
    ) {
    }

    private create() {
        return this.db.list('/shopping-carts').push({
            dateCreated: new Date().getTime()
        });
    }

    private getCart(cartId: string) {
        return this.db.object('/shopping-carts/' + cartId);
    }

    private async getOrCreateCart(product: Product) {
        const cartId = localStorage.getItem('cartId');
        if (!cartId) {
            const result = await this.create();
            localStorage.setItem('cartId', result.key);

            // add product to cart
            return this.getCart(result.key);
        }
        // add product to cart
        return this.getCart(cartId);
    }
}
