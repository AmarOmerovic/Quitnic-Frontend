import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { MotivationTipResponse } from '../../models/craving-help/motivation-tip';

@Injectable({
  providedIn: 'root',
})
export class MotivationTipService {
  private http = inject(HttpClient);
  private motivationTipApi = 'api/motivation-tips';

  fetchMotivationTips(): Observable<MotivationTipResponse[]> {
    return this.http.get<MotivationTipResponse[]>(
      `${environment.apiBaseUrl + this.motivationTipApi}`
    );
  }
}
