import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextEditorService {
  public getCamelCase(str: string): string {
    return str
      .split(/\s+/)
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(' ');
  }
}
