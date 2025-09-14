import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent,   HttpClientTestingModule, RouterTestingModule   ] 
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display welcome message with email', () => {
    component.email = 'care.monitor@gmail.com';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.dashboard-title')?.textContent)
      .toContain('Welcome, care.monitor@gmail.com');
  });

  it('should display Go to Items button', () => {
  const compiled = fixture.nativeElement as HTMLElement;
  const button = Array.from(compiled.querySelectorAll('button'))
    .find(btn => btn.textContent?.includes('Go to Items'));
  expect(button).toBeTruthy();
});

  it('should call logout when logout button is clicked', () => {
    spyOn(component, 'logout');
    const compiled = fixture.nativeElement as HTMLElement;
    const logoutBtn = compiled.querySelector('button[color="accent"]');
    (logoutBtn as HTMLElement)?.click();
    expect(component.logout).toHaveBeenCalled();
  });
});
