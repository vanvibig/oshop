import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminProductsComponent} from './components/admin-products/admin-products.component';
import {AdminOrdersComponent} from './components/admin-orders/admin-orders.component';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {MaterialModule} from '../shared/modules/material.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from '../shared/services/auth-guard.service';
import {AdminAuthGuard} from './services/admin-auth-guard.service';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        SharedModule,
        RouterModule.forRoot([
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
    declarations: [
        AdminProductsComponent,
        AdminOrdersComponent,
        ProductFormComponent,
    ],
    exports: [
        AdminProductsComponent,
        AdminOrdersComponent,
        ProductFormComponent,
        MaterialModule
    ]
})
export class AdminModule {
}
