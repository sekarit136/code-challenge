import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'auth_token';
  private userKey = 'auth_user';

  constructor(private http: HttpClient, private cookies: CookieService) { }

  login(email: string, password: string): Observable<{ token: string; user: { email: string } }> {
    return this.http.post<{ token: string; user: { email: string } }>('/api/login', { email, password }).pipe(
      map(resp => {
        this.cookies.set(this.tokenKey, resp.token);
        this.cookies.set(this.userKey, resp.user.email);
        return resp;
      })
    );
  }

  logout(): void {
    this.cookies.delete(this.tokenKey);
    this.cookies.delete(this.userKey);
  }

  isAuthenticated(): boolean {
    return this.cookies.check(this.tokenKey);
  }

  getUserEmail(): string | null {
    return this.cookies.get(this.userKey) || null;
  }

  getToken(): string | null {
    return this.cookies.get(this.tokenKey) || null;
  }

}
