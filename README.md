# Minia - Angular 12 Minia - Minimal Admin & Dashboard Template

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## deploy
ng build --prod --output-hashing=all

ng build --configuration=mahir   


## config client nginx

    server {
        listen       80;
	    server_name  e-mekteb.idrak.edu.az;
        location / {
		    proxy_pass http://127.0.0.1:7777;
        }
    }
  
	server {
        listen       80;
        server_name  back.idrak.edu.az;
        location / {
		proxy_pass http://127.0.0.1:7770;
        }
	}

## config gateway nginx
        location / {
            root   html;
            index  index.html index.htm;	
            try_files $uri $uri/ /index.html?$args;
        }