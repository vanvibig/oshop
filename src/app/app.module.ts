import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {ProductsComponent} from './shopping/components/products/products.component';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './core/components/login/login.component';
import {AuthGuard} from './shared/services/auth-guard.service';
import {SharedModule} from './shared/shared.module';
import {AdminModule} from './admin/admin.module';
import {ShoppingModule} from './shopping/shopping.module';
import {CoreModule} from './core/core.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        SharedModule,
        AdminModule,
        ShoppingModule,
        CoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot([
            {path: '', component: ProductsComponent},
            {path: 'login', component: LoginComponent},
        ])
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
