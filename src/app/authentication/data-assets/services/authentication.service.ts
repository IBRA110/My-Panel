import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthTokens, SignIn, SignUp } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public constructor(private http: HttpClient) {}

  public signUp(account: SignUp): Observable<string> {
    return this.http.post<string>(
      environment.baseUrl + '/api/v1/account/register',
      account,
    );
  }

  public signIn(account: SignIn): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(
      environment.baseUrl + 'users/authenticate',
      account,
    );
  }
}
