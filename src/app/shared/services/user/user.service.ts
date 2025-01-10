import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserRequest, UserResponse } from '../../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  userApi = 'api/user';

  createUser(user: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      `${environment.apiBaseUrl + this.userApi}`,
      user
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiBaseUrl}${this.userApi}/${id}`
    );
  }

  fetchUserWithId(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${environment.apiBaseUrl}${this.userApi}/${id}`
    );
  }
}
