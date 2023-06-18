import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserResponseService } from './user-response.service';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) {

  }
  getUserData(): Observable<UserResponseService> {
    return this.http.get<UserResponseService>(`${"http://localhost:8000/api/users/"}`);
  }
  postUserData(body: any): User {
    let bodyData = new User();
    bodyData.name = body.name;
    bodyData.email = body.email;
    bodyData.pass = body.pass;

    let result = new User();
    this.http.post<User>(`${"http://localhost:8000/api/users/"}`, bodyData)
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
