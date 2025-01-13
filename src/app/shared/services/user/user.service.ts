import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserRequest, UserResponse } from '../../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userApi = 'api/user';
  http = inject(HttpClient);

  createUser(user: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      `${environment.apiBaseUrl + this.userApi}`,
      user
    );
  }

  fetchUserWithId(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${environment.apiBaseUrl}${this.userApi}/${id}`
    );
  }
}
