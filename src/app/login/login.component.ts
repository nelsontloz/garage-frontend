import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faCoffee = faCoffee;

  loginForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      this.authService.authenticate(formValues.email, formValues.password);
    }
  }

}
