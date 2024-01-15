import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public authForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { validators: [Validators.required] }),
    });
  }
  _authService = inject(AuthService);
  ngOnInit() {}

  login(){
    if(this.authForm.invalid){
      return;
    }
    this._authService.login(this.authForm.value.email, this.authForm.value.password)
  }
}
