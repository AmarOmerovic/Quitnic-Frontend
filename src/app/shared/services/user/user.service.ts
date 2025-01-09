import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserRequest } from '../../models/user';
import { UserResponse } from '@supabase/supabase-js';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  private apiUrl = 'https://your-backend-url/api/user'; // Replace with your backend URL

  createUser(user: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}`, user);
  }

  getUserById(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`);
  }
}
