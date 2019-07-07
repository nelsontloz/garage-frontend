import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  accountForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {
    const formValues = this.accountForm.value;
    delete formValues.passwordConfirm;
    this.http.post(`${environment.API_URL}/account`, formValues).subscribe(response => {
      console.log(response);
    });
  }

}
