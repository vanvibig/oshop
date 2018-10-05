import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from './models/product';
import {map, take} from 'rxjs/operators';
import {ShoppingCart} from './models/shopping-cart';
import {Observable} from 'rxjs';

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

    async getCart(): Promise<Observable<ShoppingCart>> {
        const cartId = await this.getOrCreateCartId();
        return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(
            map(
                (res: any) => {
                    return new ShoppingCart(res.items);
                }
            )
        );
    }

    private getItem(cartId: string, productId: string) {
        return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
    }

    private async getOrCreateCartId() {
        const cartId = localStorage.getItem('cartId');
        if (cartId) {
            return cartId;
        }
        const result = await this.create();
        localStorage.setItem('cartId', result.key);

        // add product to cart
        return result.key;
    }

    async addToCart(product: Product) {
        this.updateItemQuantity(product, 1);
    }

    async removeFromCart(product: Product) {
        this.updateItemQuantity(product, -1);
    }

    private async updateItemQuantity(product: Product, change: number) {
        const cartId = await this.getOrCreateCartId();
        const item$ = this.getItem(cartId, product.id);
        item$.valueChanges().pipe(take(1)).subscribe(
            (item: any) => {
                let quantity = 0; // = (item.quantity || 0) + change;
                if (item !== null && item.quantity !== null) {
                    quantity = item.quantity + change;
                } else {
                    quantity = change;
                }
                if (quantity === 0) {
                    item$.remove();
                } else {
                    item$.update({
                        product: product,
                        quantity: quantity
                    });
                }
            }
        );
    }
}
