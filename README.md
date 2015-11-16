# redux-scratch

this application is intended to illustrate a basic [React](https://facebook.github.io/react/)
example in conjunction with [Redux](http://redux.js.org/), which is described as a "predictable state container".

Redux is said to evolve the ideas of [Flux](http://facebook.github.io/flux/), but it generally
handles the concerns of Flux in terms of managing data flow and state within an application.

this application illustrates usage patterns for the following elements:

1. [webpack](http://webpack.github.io/) for build
1. [react](https://facebook.github.io/react/) for view
1. [react-router](https://github.com/rackt/react-router) for routing
1. [redux](http://redux.js.org/) for state management and data-flow
1. [babel](http://babeljs.io/) for es-next syntax
1. [semantic-ui](http://semantic-ui.com/) for css styling
1. [axios](https://github.com/mzabriskie/axios) for promise based http requests

this application also illustrates use of the following redux-centric add-ons:

1. [redux-actions](https://github.com/acdlite/redux-actions) for idiomatic generation of redux actions and reducers
1. [redux-thunk](https://github.com/gaearon/redux-thunk) middleware for handling __function__ based actions
1. [redux-promise](https://github.com/acdlite/redux-promise) middleware for handling __promise__ based actions
1. [redux-logger](https://github.com/fcomb/redux-logger) middleware for logging redux state changes to console
1. [redux-router](https://github.com/rackt/redux-router) for integrating router state with redux
1. [redux-devtools](https://github.com/gaearon/redux-devtools) for improving the redux developer-experience (DX)

## directions

1. git clone https://github.com/tony-kerz/redux-scratch
1. cd redux-scratch
1. npm install
1. npm run dev
1. visit http://localhost:8080 in browser

## notes
* this was built using Node >= 5.x and NPM >= 3.x which resolved an issue with Semantic-UI around dependency handling
* redux-devtools is hidden by default, but hit ctrl-H to bring it on
* this was only tested in chrome `Version 46.x` so far, so YMMV in other browsers
