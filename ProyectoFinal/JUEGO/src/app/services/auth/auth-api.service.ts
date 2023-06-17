import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { Register } from 'src/app/models/register.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient) {}

  postUserRegisterData(body: any): User {
    let bodyData = {
      name: body.name,
      email: body.email,
      pass: body.pass,
    };

    let result = new User();
    this.http
      .post<User>(`${'http://localhost:8000/api/auth/register'}`, bodyData)
      .subscribe({
        next(user) {
          result = user;
        },
        error(err) {
          console.error('something wrong occurred: ' + err);
        },
        complete() {
          console.log('done');
        },
      });
    return result;
  }
  postUserLoginData(body: any) {
    let bodyData = {
      email: body.email,
      pass: body.pass,
    };
    return this.http.post<Login>(
      `${'http://localhost:8000/api/auth/login'}`,
      bodyData
    );
  }
}
