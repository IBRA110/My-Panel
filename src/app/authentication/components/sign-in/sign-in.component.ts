import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextEditorService } from 'src/app/core/services/text-editor.service';
import { SignInForm } from '../../data-assets/interfaces/form.interface';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup<SignInForm>;
  @Output() public onClick = new EventEmitter();
  public constructor(public textEditor: TextEditorService) {}

  public ngOnInit(): void {
    this.signInForm = new FormGroup<SignInForm>({
      userName: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
    });
  }

  public onSignIn(): void {}
}
