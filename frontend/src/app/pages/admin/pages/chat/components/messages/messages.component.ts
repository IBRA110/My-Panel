import {
  Component,
  EventEmitter,
  Input,
  Output,
  Inject,
  AfterViewChecked,
  DoCheck,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Message } from '../../data/interfaces/messages.interface';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent implements DoCheck, OnInit {
  public message$: FormControl = new FormControl('');
  public defaultAvatarUrl: string = '/assets/images/nav-bar/man.png/';
  public baseUrl: string = environment.baseUrl;
  private container: Element;

  @Output() public onSend: EventEmitter<string> = new EventEmitter<string>();
  @Input() public messageThread: Message[];
  @Input() public userId: string;

  private oldMessageThread: Message[];

  public constructor(@Inject(DOCUMENT) private document: Document) {}

  public checkClickedButton(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      if (e.ctrlKey) {
        this.message$.setValue(this.message$.value + '\n');
      } else {
        e.preventDefault();
        this.send();
      }
    }
  }
  public ngOnInit(): void {
    this.oldMessageThread = [...this.messageThread];
  }

  public ngDoCheck(): void {
    if (this.messageThread === this.oldMessageThread) {
      return;
    }
    this.oldMessageThread = [...this.messageThread];
    this.container = this.document.querySelector('#scrollBottom');
    this.container.scrollTop = this.container.scrollHeight;
  }

  public send(): void {
    if (!!this.message$.value) {
      this.onSend.emit(this.message$.value);
      this.message$.setValue('');
    }
  }

  public scrollDown(): void {
    this.container.scrollTop = this.container.scrollHeight;
  }
}
