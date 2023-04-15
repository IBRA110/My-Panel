import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public constructor(private apollo: Apollo) {}
}
