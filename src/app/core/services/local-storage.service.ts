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
}
