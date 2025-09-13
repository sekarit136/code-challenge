import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

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
    service.login('user@example.com', 'password').subscribe(resp => {
      expect(resp.token).toBe('mock-jwt-token');
      expect(cookieService.get('auth_token')).toBe('mock-jwt-token');
      expect(cookieService.get('auth_user')).toBe('user@example.com');
    });

    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'mock-jwt-token', user: { email: 'user@example.com' } });
  });
});
