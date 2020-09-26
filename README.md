# Ionic 4 Boilerplate

This project was generated with [Ionic CLI](https://ionicframework.com/docs/cli) version 4.7.1 and Angular version 8.1.2.

## Learn

### Overall Directory Structure

At a high level, the structure looks roughly like this:

```
<<THE APPS>>/
  |- mocks/
  |  |- dummy-data.json
  |  |- routes.json
  |- src/
  |  |- app/
  |  |  |- pages
  |  |  |  |- <app component per module>
  |  |- shared/
  |  |  |- services
  |  |  |- guards
  |  |  |- common
  |  |  |  |- <reusable code>
  |  |  |- models
  |  |  |  |- <interface>
  |  |  |- interceptors
  |- assets/
  |  |- <static files>
  |- environments/
  |  |- <env variable>
  |- package.json
```

## Development server

Run `ionic serve` for a dev server. Navigate to `http://localhost:8100/`. The app will automatically reload if you change any of the source files.

Run `npm run mock:server` to access dummy data via [JSON Server](https://github.com/typicode/json-server)

## Code scaffolding

Run `ionic generate page page-name` to generate a new page. You can also use `ionic generate component|directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ionic build` to build the project. The build artifacts will be stored in the `www/` directory. Use the `--prod` flag for a production build. Or specifically for Android you can use `npm run build` for developement build and `npm run build:production` for production build.

## Running unit tests

Run `npm test` to execute the unit tests via [Jest](https://jestjs.io/).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Ionic CLI use `ionic help` or go check out the [Ionic CLI README]https://github.com/ionic-team/ionic/blob/master/README.md).

## Usage of id_exhibitor

Example for bookmarking function (locally), `id_exhibitor` used as a unique identifier that set to local storage variable. So whenever user bookmark a list, `id_exhibitor` will be pushed to the variable, when user remove the bookmark. It will try to find `id_exhibitor` from list. And filter the list.
