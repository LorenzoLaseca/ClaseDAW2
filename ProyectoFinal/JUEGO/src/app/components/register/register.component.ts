import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/services/auth/auth-api.service';
import { UserApiService } from 'src/app/services/user/user-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    pass: ['', [Validators.required]]
  });

  constructor(private router: Router, private fb: FormBuilder, private userApi: UserApiService, private authApi: AuthApiService) {

  }
  onSubmit() {
    this.authApi.postUserRegisterData(this.registerForm.value);
    //alert('Se ha registrado correctamente')
    this.router.navigate([''])
  }

  irALogin() {
    this.router.navigate([''])
  }
}
