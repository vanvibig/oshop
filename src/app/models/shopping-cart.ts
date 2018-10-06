import {ShoppingCartItem} from './shopping-cart-item';
import {Product} from './product';

export class ShoppingCart {

    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: {
        [productId: string]: ShoppingCartItem;
    }) {
        this.itemsMap = itemsMap || {};
        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            let x = new ShoppingCartItem();
            Object.assign(x, item);
            x.id = productId;
            this.items.push(x);
        }
    }

    get productIds() {
        return Object.keys(this.itemsMap);
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }

    getQuantity(product: Product) {
        if (this.itemsMap === undefined) {
            return 0;
        }
        const item = this.itemsMap[product.id];
        return item ? item.quantity : 0;
    }
}
