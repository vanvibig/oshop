import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import {UserModel} from '../models/user.model';

@Component({
    selector: 'bs-navbar',
    templateUrl: './bs-navbar.component.html',
    styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

    userModel: UserModel;

    constructor(private authService: AuthService) {
        authService.userModel$.subscribe(
            userModel => this.userModel = userModel
        );
    }

    logout() {
        this.authService.logout();
    }

}
