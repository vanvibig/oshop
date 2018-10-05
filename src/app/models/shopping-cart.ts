import {ShoppingCartItem} from './shopping-cart-item';

export class ShoppingCart {

    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: {
        [productId: string]: ShoppingCartItem
    }) {
        for (let productId in itemsMap) {
            if (itemsMap) { // required by ts
                this.items.push(itemsMap[productId]);
            }
        }
    }

    get productIds() {
        return Object.keys(this.itemsMap);
    }

    get totalItemsCount() {
        let count = 0;
        for (const productId in this.itemsMap) {
            if (productId) { // required by ts
                count += this.itemsMap[productId].quantity;
            }
        }
        return count;
    }
}
