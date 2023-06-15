import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserApiService } from 'src/app/services/user/user-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { AbstractControl, FormGroup, FormBuilder, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarios: Array<User>
  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(2)]],
    pass: ['', [Validators.required, Validators.minLength(2)]]
  });

  constructor(private userApi: UserApiService, private router: Router, private fb: FormBuilder) {
    this.usuarios = []

  }

  ngOnInit() {
    this.userApi.getUserData().subscribe(res => {
      this.usuarios = res.data;
    });

  }
  onSubmit() {
    let existe = false;
    this.usuarios.forEach(usuario => {
      if (usuario.email === this.userForm.value.email && usuario.pass === this.userForm.value.pass) {
        let idUser = usuario._id;
        this.router.navigate([idUser + '/characters/'])
        existe = true;
      }

    });
    if (!existe) {
      alert('Usuario no encontrado');
    }
  }
  irARegister() {
    this.router.navigate(['/register/'])
  }

}
