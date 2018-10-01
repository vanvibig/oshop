import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {BsNavbarComponent} from './bs-navbar/bs-navbar.component';
import {HomeComponent} from './home/home.component';
import {ProductsComponent} from './products/products.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {OrderSuccessComponent} from './order-success/order-success.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {AdminProductsComponent} from './admin/admin-products/admin-products.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth-guard.service';
import {AuthService} from './auth.service';
import {ProductFormComponent} from './admin/product-form/product-form.component';
import {AdminAuthGuard} from './admin-auth-guard.service';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/material.module';

@NgModule({
    declarations: [
        AppComponent,
        BsNavbarComponent,
        HomeComponent,
        ProductsComponent,
        ShoppingCartComponent,
        CheckOutComponent,
        OrderSuccessComponent,
        MyOrdersComponent,
        AdminProductsComponent,
        AdminOrdersComponent,
        LoginComponent,
        ProductFormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        CustomFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        NgbModule.forRoot(),
        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: 'products', component: ProductsComponent},
            {path: 'shopping-cart', component: ShoppingCartComponent},
            {path: 'login', component: LoginComponent},

            {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
            {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard]},
            {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
            {
                path: 'admin/products/new',
                component: ProductFormComponent,
                canActivate: [AuthGuard, AdminAuthGuard]
            },
            {
                path: 'admin/products/:id',
                component: ProductFormComponent,
                canActivate: [AuthGuard, AdminAuthGuard]
            },
            {
                path: 'admin/products',
                component: AdminProductsComponent,
                canActivate: [AuthGuard, AdminAuthGuard],
            },
            {
                path: 'admin/orders',
                component: AdminOrdersComponent,
                canActivate: [AuthGuard, AdminAuthGuard]
            },
        ])

    ],
    exports: [
        MaterialModule
    ],
    providers: [AuthGuard, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
