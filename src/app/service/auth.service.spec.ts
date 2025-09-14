import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import 'zone.js/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, CookieService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    cookieService = TestBed.inject(CookieService);
  });

  afterEach(() => { httpMock.verify(); cookieService.delete('auth_token'); });

  it('should store token and user on successful login', () => {
    service.login('care.monitor@gmail.com', 'password').subscribe(resp => {
      expect(resp.token).toBe('mock-jwt-token');
      expect(cookieService.get('auth_token')).toBe('mock-jwt-token');
      expect(cookieService.get('auth_user')).toBe('care.monitor@gmail.com');
    });

    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'mock-jwt-token', user: { email: 'care.monitor@gmail.com' } });
  });

  it('should delete token and user on logout', () => {
    cookieService.set('auth_token', 'token');
    cookieService.set('auth_user', 'care.monitor@gmail.com');
    service.logout();
    expect(cookieService.get('auth_token')).toBe('');
    expect(cookieService.get('auth_user')).toBe('');
  });

  it('should return true for isAuthenticated when token exists', () => {
    cookieService.set('auth_token', 'token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false for isAuthenticated when token does not exist', () => {
    cookieService.delete('auth_token');
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should return user email from cookie', () => {
    cookieService.set('auth_user', 'user@example.com');
    expect(service.getUserEmail()).toBe('user@example.com');
  });

  it('should return token from cookie', () => {
    cookieService.set('auth_token', 'token');
    expect(service.getToken()).toBe('token');
  });
});
