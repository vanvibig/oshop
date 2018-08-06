import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(state: RouterStateSnapshot) {
        return this.authService.user$.subscribe(
            user => {
                if (user) { return true; }
                this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
                return false;
            }
        );
    }
}
