import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {ProductsComponent} from './shopping/components/products/products.component';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './core/components/login/login.component';
import {AuthGuard} from './shared/services/auth-guard.service';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        CustomFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        NgbModule.forRoot(),
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
