import { inject, Injectable } from '@angular/core';
import { UserAchievementResponse } from '../../models/achievements/user-achievement';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AchievementService {
  private http = inject(HttpClient);
  private apiAchievements = 'api/achievements/';

  fetchUserAchievements(userId: string): Observable<UserAchievementResponse[]> {
    return this.http.get<UserAchievementResponse[]>(
      `${environment.apiBaseUrl}${this.apiAchievements}${userId}`
    );
  }
}
