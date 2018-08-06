import {Component} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private authService: AuthService, router: Router) {
        authService.user$.subscribe(
            user => {
                if (user) {
                    let returnUrl = localStorage.getItem('returnUrl');
                    router.navigateByUrl(returnUrl);
                }
            }
        );
    }
}
