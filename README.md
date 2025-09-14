# CodeChallenge

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.1.

## Angular setup
```bash
npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# Angular Interview Task

This is a simple Angular 20 application demonstrating **authentication**, **protected routes**, **state management**, **mock APIs**, and **Angular Material UI** — built with **standalone components** and the latest Angular features.

---

## Features

1. **Login Page**
   - Email & Password form
   - Calls mock API (`POST /api/login`)
   - Stores token in cookies
   - Redirects to dashboard on success

2. **Authentication**
   - Token-based authentication stored in cookies
   - Function-based **Auth Guard** protects routes
   - **Logout** clears cookies and redirects to login

3. **Dashboard Page**
   - Displays logged-in user email
   - Navigation link to **Items page**
   - Logout button

4. **Items Page**
   - Fetches mock data from `GET /api/items`
   - Managed via **NgRx Component Store**
   - Handles **loading** and **error** states
   - Angular Material `mat-list` for UI

5. **UI & Design**
   - Built with **Angular Material**
   - `MatToolbar`, `MatList`, `MatCard`, `MatSnackBar`
   - Flexbox-based layout with `.spacer`

6. **Mock APIs**
   - Implemented via `mockApiInterceptor`
   - `POST /api/login` → returns `{ token, user }`
   - `GET /api/items` → returns an array of items

---

## Tech Stack

- [Angular 20](https://angular.dev/) (standalone APIs, signals, new template syntax)
- [Angular Material](https://material.angular.io/)
- [NgRx Component Store](https://ngrx.io/guide/component-store)
- [ngx-cookie-service](https://www.npmjs.com/package/ngx-cookie-service)

- RxJS

## Project Structure

src/app/
├── auth/ # login page, auth service, auth guard
├── dashboard/ # dashboard page
├── items/ # list page, items store
├── interceptors/ # auth + mock API interceptors
└── app.routes.ts # routes with lazy loading