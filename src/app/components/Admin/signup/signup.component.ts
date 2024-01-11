import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  public authForm: FormGroup;
  _authService = inject(AuthService);
  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      username: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { validators: [Validators.required] }),
      confirmPassword: new FormControl(null, { validators: [Validators.required] }),
    }, { validators: this.passwordMatchValidator });
  }
  ngOnInit() {

  }
  passwordMatchValidator(group: FormGroup) {
    const password = group.value.password;
    const confirmPassword = group.value.confirmPassword;

    return password === confirmPassword ? null : { mismatch: true };
  }
  onSignUp(){
    this._authService.signUp(
      this.authForm.value.username,
      this.authForm.value.email,
      this.authForm.value.password,
      this.authForm.value.confirmPassword
    )
  }
}
