# redux-scratch

This application is intended to illustrate a non-trivial [React](https://facebook.github.io/react/)
application in conjunction with the [Redux](http://redux.js.org/) "predictable state container".

Redux is said to evolve the ideas of [Flux](http://facebook.github.io/flux/), but it generally
handles the concerns of Flux in terms of managing data flow and state within an application.

This application is described as non-trivial as it intends to show patterns found in more sophisticated applications in this genre, such as:

* [OAuth2](http://oauth.net/2/) based authentication
* [JWT](http://jwt.io/) based authorization
* "authorization-aware" routing
* [infinite-scrolling](https://xkcd.com/1309/)
* Redux in conjunction with Promises

this application illustrates usage patterns for the following elements:

1. [webpack](http://webpack.github.io/) for build
1. [react](https://facebook.github.io/react/) for view
1. [react-router](https://github.com/rackt/react-router) for routing
1. [redux](http://redux.js.org/) for state management and data-flow
1. [babel](http://babeljs.io/) for es-next syntax
1. [bootstrap](http://getbootstrap.com/) for css styling
1. [axios](https://github.com/mzabriskie/axios) for promise based http requests
1. [hellojs](http://adodson.com/hello.js/) for client-side authentication via oauth
1. [jwt-decode](https://github.com/auth0/jwt-decode) for decoding jwt tokens
1. [react-waypoint](https://github.com/brigade/react-waypoint) for react style infinite-scroll
1. [json-server](https://github.com/typicode/json-server) for mock server api's

this application also illustrates use of the following redux-centric add-ons:

1. [redux-actions](https://github.com/acdlite/redux-actions) for idiomatic generation of redux actions and reducers
1. [redux-thunk](https://github.com/gaearon/redux-thunk) middleware for handling __function__ based actions
1. [redux-promise](https://github.com/acdlite/redux-promise) middleware for handling __promise__ based actions
1. [redux-logger](https://github.com/fcomb/redux-logger) middleware for logging redux state changes to console
1. [redux-simple-router](https://github.com/rackt/redux-simple-router) for integrating router state with redux
1. [redux-devtools](https://github.com/gaearon/redux-devtools) for improving the redux developer-experience (DX)
1. [redux-form](http://erikras.github.io/redux-form) for managing form state in redux store

## directions

1. git clone https://github.com/tony-kerz/redux-scratch
1. cd redux-scratch
1. npm install
1. npm run generate-mock-data
1. npm run dev-mock
1. visit http://localhost:8080 in browser

## notes
* this was built using Node >= 5.x and NPM >= 3.x
* redux-devtools is hidden by default, but hit ctrl-H to bring it on
* this was only tested in chrome `Version 47.x` so far, so YMMV in other browsers

## potential future enhancements
* [replace promises with observables](https://www.youtube.com/watch?v=DaCc8lckuw8)
* [support for server side rendering](https://www.terlici.com/2015/03/18/fast-react-loading-server-rendering.html)
