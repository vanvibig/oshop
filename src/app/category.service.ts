import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

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
        return this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges();
    }

    getCategoriesByAfs() {
        return this.afs.collection('/categories').valueChanges();
    }

    getCategoriesKey() {
        return this.db.list('/categories').snapshotChanges();
    }
}
