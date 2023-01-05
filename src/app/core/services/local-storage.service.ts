import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public hasLocalStorage: boolean = false;

  public constructor() {}

  public saveData(key: string, data: any): void {
    if (!this.hasLocalStorage) {
      return;
    }
    localStorage.setItem(key, data);
  }
}
