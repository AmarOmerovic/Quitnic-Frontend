import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { SupabaseService } from '../services/supabase/supabase.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const supabaseService = inject(SupabaseService);
  const session = supabaseService.getSessionSync();

  if (session?.access_token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    return next(clonedRequest);
  }

  return next(req);
};
