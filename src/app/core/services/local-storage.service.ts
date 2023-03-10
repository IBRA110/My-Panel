import { Injectable } from '@angular/core';
import { AuthTokens } from 'src/app/pages/authentication/data-access/interfaces/auth.interface';
import { AuthTokensEnum } from '../enums/local-storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public constructor() {}

  public saveData(key: string, data: any): void {
    localStorage.setItem(key, data);
  }

  public getData(key: string): string | null {
    return localStorage.getItem(key);
  }

  public setTokens(authTokens: AuthTokens) {
    this.saveData(AuthTokensEnum.ACCESS, authTokens.accessToken);
    this.saveData(AuthTokensEnum.REFRESH, authTokens.refreshToken);
  }

  public getDecodeDataBase64Url<T>(key: string): T {
    const base64Url = key.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = this._b64DecodeUnicode(base64);
    return JSON.parse(jsonPayload);
  }

  public getExpiration(token: string): number {
    return this._b64DecodeUnicode(token).exp;
  }

  private _b64DecodeUnicode(str: string): any {
    const base64Url = str.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    return JSON.parse(jsonPayload);
  }
}
