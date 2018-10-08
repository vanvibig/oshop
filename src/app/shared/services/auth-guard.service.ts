import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        // let ret = false;
        return this.authService.user$.pipe(
            map(
                user => {
                    if (user) {
                        return true;
                    }
                    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
                    return false;
                }
            )
        );
        // return ret;
    }
}
