import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {
  UserSmokeHistoryRequest,
  UserSmokeHistoryResponse,
} from '../../models/user-smoke-history';

@Injectable({
  providedIn: 'root',
})
export class UserSmokeHistoryService {
  smokeHistoryApi = 'api/smoke-history';
  http = inject(HttpClient);

  fetchSmokeHistory(userId: string): Observable<UserSmokeHistoryResponse> {
    return this.http.get<UserSmokeHistoryResponse>(
      `${environment.apiBaseUrl}${this.smokeHistoryApi}/${userId}`
    );
  }

  updateSmokeHistory(
    userId: string,
    history: UserSmokeHistoryRequest
  ): Observable<UserSmokeHistoryResponse> {
    return this.http.put<UserSmokeHistoryResponse>(
      `${environment.apiBaseUrl}${this.smokeHistoryApi}/${userId}`,
      history
    );
  }
}
