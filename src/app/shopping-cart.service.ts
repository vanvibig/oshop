import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product, ProductBase} from './models/product';
import {take} from 'rxjs/operators';

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
        return this.db.object('/shopping-carts/' + cartId).valueChanges();
    }

    private async getOrCreateCartId() {
        const cartId = localStorage.getItem('cartId');
        if (cartId) return cartId;
        const result = await this.create();
        localStorage.setItem('cartId', result.key);

        // add product to cart
        return result.key;
    }

    async addToCart(product: Product) {
        const cartId = await this.getOrCreateCartId();
        const item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.id);
        item$.valueChanges().pipe(take(1)).subscribe(
            (item: any) => {
                if (item) {
                    item$.update({
                        quantity: item.quantity + 1
                    });
                } else {
                    item$.set({
                        product: new ProductBase(product),
                        quantity: 1
                    });
                }
            }
        );
    }
}
