import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  AuthResponse,
  AuthSession,
  createClient,
  Session,
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
  private cachedSession: AuthSession | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.supabase = createClient(
        environment.supabaseUrl,
        environment.supabaseKey
      );

      this.supabase.auth.getSession().then((response) => {
        this.cachedSession = response.data.session;
      });

      this.supabase.auth.onAuthStateChange((_event, session) => {
        this.cachedSession = session;
      });
    }
  }

  getSessionSync(): AuthSession | null {
    return this.cachedSession;
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

  signOut(): Observable<AuthResponse> {
    if (!this.supabase) {
      return throwError(() => new Error('Supabase is not initialized.'));
    }

    const promise = this.supabase.auth.signOut().then((result) => {
      localStorage.removeItem('userId');
      localStorage.removeItem('fullName');

      return {
        data: { user: null, session: null },
        error: result.error,
      };
    });
    return from(promise);
  }
}
