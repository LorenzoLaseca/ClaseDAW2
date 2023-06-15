import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserResponseService {
  data: User[];

  constructor() {
    this.data = [];
  }
}