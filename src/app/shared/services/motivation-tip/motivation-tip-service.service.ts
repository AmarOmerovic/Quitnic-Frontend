import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MotivationTip } from '../../models/motivation-tip';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MotivationTipService {
  private http = inject(HttpClient);
  private motivationTipApi = 'api/motivation-tips';

  fetchMotivationTips(): Observable<MotivationTip[]> {
    return this.http.get<MotivationTip[]>(
      `${environment.apiBaseUrl + this.motivationTipApi}`
    );
  }
}
