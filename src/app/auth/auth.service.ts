import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {UserModel} from './user.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as authActions from './store/auth.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;

}

@Injectable({providedIn: 'root'})
export class AuthService {
  // user = new BehaviorSubject<UserModel>(null);
  private expirationTimer: any

  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {
  }

  signUp(email: string, password: string) {
    console.log(email, password)
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIkey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(respData => {
      this.handleAuthentication(respData.email, respData.idToken, +respData.expiresIn,respData.localId)
    }))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIkey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
      ).pipe(catchError(this.handleError), tap(respData => {
        this.handleAuthentication(respData.email, respData.idToken, +respData.expiresIn,respData.localId)
    }))
  }

  logOut() {
    // this.user.next(null);
    this.store.dispatch(new authActions.Logout())
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer)
    }
    this.expirationTimer = null;
  }


  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    }
    const loadedUser = new UserModel(userData.email,userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      // this.user.next(loadedUser)
      this.store.dispatch(new authActions.Login({
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate)
      }))
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration)
    }
  }

  autoLogout(expirationDuration: number) {
    this.expirationTimer = setTimeout(() => {
      this.logOut()
    }, expirationDuration)
  }

  private handleAuthentication(email: string, token: string, expiresIn: number, userId: string) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserModel(email,userId,token,expirationDate);
    // this.user.next(user);
    this.store.dispatch(new authActions.Login({email: email, userId: userId, token: token, expirationDate: expirationDate}))
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  private handleError(errorResp: HttpErrorResponse) {
    let errorMessage = 'AN uknown error occurred'
    if (!errorResp.error || !errorResp.error.error) {
      return throwError(errorMessage)
    }
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
    }
    return throwError(errorMessage)
  }
}
