# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

The app uses Tailwind CSS for the components and grid system. And it has all of its components inside the `src/app` folder.

## Installation
On the root of the Frontend folder execute the following
```bash
npm install
```
Note that the npm version used is 10.7.0.

## Running the app

Execute `ng serve` and Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Environment variables

The app contains an environment file inside the path `./src/environments/environment.ts`. There you need to update the baseAddress property to match the port of the Backend API.

```javascript
export const environment = {
    production: false,
    baseAddress: 'http://localhost:8000'
};
```
