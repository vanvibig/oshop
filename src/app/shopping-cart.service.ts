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

    async getCart() {
        const cartId = await this.getOrCreateCartId();
        return this.db.object('/shopping-carts/' + cartId);
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
                item$.update({
                    product: product,
                    quantity: (item !== null && item.quantity !== null ? item.quantity : 0) + change
                });
            }
        );
    }
}
