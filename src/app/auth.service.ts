import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from './models/user.model';
import {switchMap} from 'rxjs/operators';
import {UserService} from './user.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user$: Observable<firebase.User>;

    constructor(private afAuth: AngularFireAuth,
                private route: ActivatedRoute,
                private userService: UserService,
                private router: Router) {
        this.user$ = afAuth.authState;
    }

    login() {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        if(returnUrl === '/login') {
            returnUrl = '/';
        }
        localStorage.setItem('returnUrl', returnUrl);
        return this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    get userModel$(): Observable<UserModel> {
        return this.user$.pipe(
            switchMap(user => {
                if (user) {
                    return this.userService.get(user.uid).valueChanges();
                }
                return of(null);
            })
        );
    }
}
