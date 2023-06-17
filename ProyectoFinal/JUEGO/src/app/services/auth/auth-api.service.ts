import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http: HttpClient) {

   }
  //  postUserRegisterData(userData: any): Observable<any> {
  //   return this.http.post(`${"http://localhost:8000/api/characters/"}`, userData);
  // }

  postUserRegisterData(body: any): User {
    let bodyData = new User();
    bodyData.name = body.name;
    bodyData.email = body.email;
    bodyData.pass = body.pass;

    let result = new User();
    this.http.post<User>(`${"http://localhost:8000/api/users"}`,bodyData)
      .subscribe(
        {
          next(user) {
            result = user;
          },
          error(err) {
            console.error('something wrong occurred: ' + err);
          },
          complete() {
            console.log('done');
          },
        }
      )
    return result;
  } 
}
