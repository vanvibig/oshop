import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BsNavbarComponent} from './components/bs-navbar/bs-navbar.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RouterModule} from '@angular/router';
import {ShoppingModule} from '../shopping/shopping.module';

@NgModule({
    imports: [
        CommonModule,
        ShoppingModule,
        RouterModule.forChild([
        ])
    ],
    declarations: [
        BsNavbarComponent,
        HomeComponent,
        LoginComponent,
    ],
    exports: [
        BsNavbarComponent
    ]
})
export class CoreModule {
}
