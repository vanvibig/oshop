import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let ret = false;
        this.authService.user$.subscribe(
            user => {
                if (user) {
                   ret = true;
                }
                this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
                ret = false;
            }
        );
        return ret;
    }
}
