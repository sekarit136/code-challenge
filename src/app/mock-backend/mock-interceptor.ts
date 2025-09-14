import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export const mockInterceptor: HttpInterceptorFn = (req, next) => {

  let password = '12345678';
  let userName = 'care.monitor@gmail.com';
  if (req.url === '/api/login' && req.method === 'POST') {
    const body = req.body as { email: string; password: string };
    if (body?.email && body?.password && body.email== userName  && body.password == password) {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            token: 'mock-jwt-token-123',
            user: { email: body.email }
          }
        })
      ).pipe(delay(800));
    } else {
      return of(
        new HttpResponse({
          status: 401,
          body: { message: 'Invalid credentials' }
        })
      ).pipe(delay(500));
    }
  }

  if (req.url === '/api/items' && req.method === 'GET') {
    const authHeader = req.headers.get('Authorization');
    const validToken = 'Bearer mock-jwt-token-123';
    if (authHeader !== validToken) {
      return of(
        new HttpResponse({
          status: 401,
          body: { message: 'Invalid or missing token' }
        })
      ).pipe(delay(300));
    }
    return of(
      new HttpResponse({
        status: 200,
        body: [
          {
            id: 1,
            name: 'Virtual Care and Remote Patient Monitoring',
            description: 'Solution for delivering healthcare remotely and monitoring patients outside traditional settings',
            icon: 'videocam'
          },
          {
            id: 2,
            name: 'Hospital in the Home Platform',
            description: 'Platform enabling hospital-level care to be provided at home',
            icon: 'home_health'
          },
          {
            id: 3,
            name: 'Chronic Disease Management',
            description: 'Programs and tools to manage long-term chronic illnesses effectively',
            icon: 'healing'
          },
          {
            id: 4,
            name: 'Perioperative Care',
            description: 'Comprehensive care for patients before, during, and after surgery',
            icon: 'medical_services'
          },
          {
            id: 5,
            name: 'Community eMR',
            description: 'Electronic Medical Record system designed for community healthcare settings',
            icon: 'folder_shared'
          }
        ]
      })
    ).pipe(delay(500));
  }

  return next(req);
};
