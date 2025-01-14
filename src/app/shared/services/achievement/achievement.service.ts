import { inject, Injectable } from '@angular/core';
import { UserAchievement } from '../../models/user-achievement';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AchievementService {
  private http = inject(HttpClient);
  private apiAchievements = 'api/achievements/';

  fetchUserAchievements(userId: string): Observable<UserAchievement[]> {
    return this.http.get<UserAchievement[]>(
      `${environment.apiBaseUrl}${this.apiAchievements}${userId}`
    );
  }
}
