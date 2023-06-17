import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserApiService } from 'src/app/services/user/user-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import {
  AbstractControl,
  FormGroup,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthApiService } from 'src/app/services/auth/auth-api.service';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuarios: Array<User>;
  usuario: Login;
  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(2)]],
    pass: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor(
    private userApi: UserApiService,
    private authApi: AuthApiService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.usuarios = [];
    this.usuario = new Login();
  }

  ngOnInit() {
    /*
    this.userApi.getUserData().subscribe(res => {
      this.usuarios = res.data;
    });*/
  }
  onSubmit() {
    let existe = false;
    /*
    this.usuarios.forEach(usuario => {
      if (usuario.email === this.userForm.value.email && usuario.pass === this.userForm.value.pass) {
        let idUser = usuario._id;
        this.router.navigate([idUser + '/characters/'])
        existe = true;
      }

    });
    if (!existe) {
      alert('Usuario no encontrado');
    }*/

    this.authApi.postUserLoginData(this.userForm.value).subscribe(
      (response) => {
        this.router.navigate([response.data?._id + '/characters/']);
      },
      (error) => {
        alert('Usuario incorrecto');
      }
    );
  }
  irARegister() {
    this.router.navigate(['/register/']);
  }
}
