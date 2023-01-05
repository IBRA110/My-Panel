import { Injectable } from '@angular/core';

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
}
