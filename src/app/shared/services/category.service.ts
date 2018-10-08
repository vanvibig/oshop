import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(
        private db: AngularFireDatabase,
        private afs: AngularFirestore,
    ) {
    }

    getCategories() {
        return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges();
    }

    getAllCategories() {
        return this.db.list('/categories', ref => ref.orderByChild('name'))
            .snapshotChanges()
            .pipe(
                map((items: any) => {
                    return items.map(a => {
                        const data = a.payload.val();
                        const key = a.payload.key;
                        return {
                            id: key,
                            name: data.name
                        };
                    });
                })
            );
    }

    getCategoriesByAfs() {
        return this.afs.collection('/categories').valueChanges();
    }

    getCategoriesKey() {
        return this.db.list('/categories').snapshotChanges();
    }
}
