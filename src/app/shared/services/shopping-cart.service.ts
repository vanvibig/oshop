import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from '../models/product';
import {map, take} from 'rxjs/operators';
import {ShoppingCart} from '../models/shopping-cart';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    constructor(
        private db: AngularFireDatabase
    ) {
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

    async addToCart(product: Product) {
        this.updateItem(product, 1);
    }

    async removeFromCart(product: Product) {
        this.updateItem(product, -1);
    }

    async clearCart() {
        const cartId = await this.getOrCreateCartId();
        this.db.object('/shopping-carts/' + cartId + '/items').remove();
    }

    async clearProduct(productId: string) {
        const cartId = await this.getOrCreateCartId();
        this.db.object('/shopping-carts/' + cartId + '/items/' + productId).remove();
    }

    private create() {
        return this.db.list('/shopping-carts').push({
            dateCreated: new Date().getTime()
        });
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

    private async updateItem(product: Product, change: number) {
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
                        title: product.title,
                        imageUrl: product.imageUrl,
                        price: product.price,
                        quantity: quantity
                    });
                }
            }
        );
    }
}
