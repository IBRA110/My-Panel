import { Injectable } from '@angular/core';
import { AuthTokens } from 'src/app/authentication/data-access/interfaces/auth.interface';
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
    const jsonPayload = this.b64DecodeUnicode(base64);
    return JSON.parse(jsonPayload);
  }

  public getExpiration(token: string): number {
    const { expiration } = this.getDecodeDataBase64Url<any>(token);
    return expiration;
  }

  // Encoding UTF8 ⇢ base64
  private b64EncodeUnicode(str: string): string {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
      }),
    );
  }

  // Decoding base64 ⇢ UTF8
  private b64DecodeUnicode(str: string): string {
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(str), function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
  }
}
