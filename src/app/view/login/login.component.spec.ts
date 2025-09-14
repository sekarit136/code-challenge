import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../service/auth.service';
import { LoadingService } from '../../service/loading.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';

class MockAuthService {
  login(email: string, password: string) {
    return of({ token: 'mock-token', user: { email } });
  }
}

class MockLoadingService {
  loading = () => false;
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

class MockSnackBar {
  open = jasmine.createSpy('open');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let auth: AuthService;
  let router: Router;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: LoadingService, useClass: MockLoadingService },
        { provide: Router, useClass: MockRouter },
        { provide: MatSnackBar, useClass: MockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    auth = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should show validation errors for email and password', () => {
    component.formGroup.get('email')?.markAsTouched();
    component.formGroup.get('password')?.markAsTouched();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Email is required');
    expect(compiled.textContent).toContain('Password is required');
  });

  it('should call auth.login and navigate on successful submit', async () => {
    spyOn(auth, 'login').and.returnValue(
      of({ token: 'mock-jwt-token-123', user: { email: 'care.monitor@gmail.com' } })
    );
    component.formGroup.setValue({ email: 'care.monitor@gmail.com', password: '12345678' });
    component.submit();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(auth.login).toHaveBeenCalledWith('care.monitor@gmail.com', '12345678');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show snackbar on login error', async () => {
    spyOn(auth, 'login').and.returnValue(throwError(() => new Error('Invalid')));
    component.formGroup.setValue({ email: 'user@example.com', password: 'wrong' });
    component.submit();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Invalid Credentials',
      'Close',
      jasmine.any(Object)
    );
  });
});
