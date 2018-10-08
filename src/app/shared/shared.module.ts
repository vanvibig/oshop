import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCartComponent} from './components/product-cart/product-cart.component';
import {ProductQuantityComponent} from './components/product-quantity/product-quantity.component';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {MaterialModule} from './modules/material.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFirestore, AngularFirestoreModule} from 'angularfire2/firestore';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CustomFormsModule,
        MaterialModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        NgbModule.forRoot(),
    ],
    declarations: [
        ProductCartComponent,
        ProductQuantityComponent,
    ],
    exports: [
        ProductCartComponent,
        ProductQuantityComponent,

        CommonModule,
        FormsModule,
        CustomFormsModule,
        MaterialModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        NgbModule.forRoot().ngModule,
    ],
})
export class SharedModule {
}
