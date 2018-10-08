import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private db: AngularFireDatabase) {
    }

    create(product) {
        return this.db.list('/products').push(product);
    }

    getAll() {
        return this.db.list('/products').snapshotChanges().pipe(
            map(items => {
                return items.map(a => {
                    const data = a.payload.val();
                    const key = a.payload.key;
                    return {key, data};
                });
            })
        );
    }

    getAllDetail() {
        return this.db.list('/products').snapshotChanges().pipe(
            map((items: any) => {
                return items.map(a => {
                    const data = a.payload.val();
                    const key = a.payload.key;
                    return {
                        id: key,
                        title: data.title,
                        price: data.price,
                        category: data.category,
                        imageUrl: data.imageUrl
                    };
                });
            })
        );
    }

    getAllvalueChanges() {
        return this.db.list('/products').valueChanges();
    }

    get(productId) {
        return this.db.object('/products/' + productId).valueChanges();
    }

    update(productId, product) {
        return this.db.object('/products/' + productId).update(product);
    }

    delete(productId) {
        return this.db.object('/products/' + productId).remove();
    }
}
