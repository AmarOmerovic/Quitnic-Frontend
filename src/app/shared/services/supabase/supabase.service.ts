import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  AuthResponse,
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { isPlatformBrowser } from '@angular/common';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.supabase = createClient(
        environment.supabaseUrl,
        environment.supabaseKey
      );
    }
  }

  signUp(email: string, password: string): Observable<AuthResponse> {
    if (!this.supabase)
      return throwError(() => new Error('Supabase is not initialized.'));

    const promise = this.supabase.auth.signUp({
      email,
      password,
    });
    return from(promise);
  }

  signIn(email: string, password: string): Observable<AuthResponse> {
    if (!this.supabase)
      return throwError(() => new Error('Supabase is not initialized.'));

    const promise = this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    return from(promise);
  }
}
