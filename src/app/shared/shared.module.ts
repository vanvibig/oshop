import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCartComponent} from './components/product-cart/product-cart.component';
import {ProductQuantityComponent} from './components/product-quantity/product-quantity.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ProductCartComponent,
        ProductQuantityComponent,
    ],
    exports: [
        ProductCartComponent,
        ProductQuantityComponent,
    ],
})
export class SharedModule {
}
