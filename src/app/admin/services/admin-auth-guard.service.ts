import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';
import {map} from 'rxjs/operators';
import {UserService} from '../../shared/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

    constructor(private authService: AuthService, private userService: UserService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.userModel$.pipe(
            map(userModel => userModel.isAdmin)
        );
    }


}
