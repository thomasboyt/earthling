# Earthling 

[![Build Status](https://travis-ci.org/thomasboyt/earthling.svg?branch=master)](https://travis-ci.org/thomasboyt/earthling)
[![npm](https://img.shields.io/npm/v/earthling.svg)](https://www.npmjs.com/package/earthling)

Earthling is an opinionated wrapper around React, Redux, React-Router, Babel, and Webpack. Think of it as a build tool and (tiny) framework.

## Why?

Applications built using the modern "React stack" seem to require an [awful lot of boilerplate](https://github.com/xgrommx/awesome-redux#boilerplate) that developers have to manage themselves. Meanwhile, more opinionated frameworks like Ember are able to easily provide [kickass CLI tooling](https://guides.emberjs.com/v2.2.0/getting-started/ember-cli/) that makes it much easier to get up and running.

Earthling attempts to build tooling for React by applying some (hopefully agreeable) opinions on how an application should be structured. It's able to abstract some of the usual configuration required for tools like Babel, Webpack, and Karma, while still providing hooks for extending and customizing their configuration.

Earthling also tries to abstract some of the most common problems in setting up Redux applications: store boilerplate, DevTools boilerplate, and hot module reloading configuration.

One problem Earthling isn't currently targeting is universal (isomorphic) rendering. This is a really complex topic with a lot of churn that mostly requires bespoke solutions, unfortunately. Long-term, Earthling may be able to provide pieces of functionality that are used in universal apps, but probably won't ever be able to provide a full framework for them.

## Should I use this?

Not yet! Wait for it to hit 0.1.0, at which point I'll start actually supporting it and publishing changelogs and such.

## Where can I see it in action?

The template/ folder contains a stripped-down example, while the [earthling branch of Bipp](https://github.com/thomasboyt/bipp/tree/earthling) shows it in a larger application. Thrill at the lack of webpack boilerplate! Be amazed at the complete absence of a Karma configuration! Etc.

## Manual

### Installation

First, make sure you have Node >=4.x and NPM >= 3.x. Earthling might work with other versions, but I wouldn't recommend it.

Install the tool:

```
npm install -g earthling
```

Create an example app:

```
earthling init my-app
```

And run it:

```
cd my-app/
earthling serve
```

### Command Reference

#### `earthling init <app>`

Generates a new app in a folder named `app`.

Options:

* `--force`: Init an app in the specificed path even if it already exists

#### `earthling serve`

Serves your app for development using webpack-dev-server.

Options:

* `--port`: Change the port to bind to (default `3000`)
* `--hot`: Enable hot module reloading & [react-transform-hmr](https://github.com/gaearon/react-transform-hmr). This will likely slow build times
* `--prod`: Preview your app in the production environment

See below for information on proxying requests to a backend server.

#### `earthling test`

Runs your tests using Karma. Continually rebuilds & re-runs tests when files change.

Options:

* `--single-run`: Run tests once
* `--browsers`: Specify browsers to run tests in, e.g. `--browsers Chrome,Firefox` (requires the appropriate Karma launchers)

#### `earthling build`

Build your application to `build/`. Defaults to a production (optimized) build.

Options:

* `--dev`: Create a development build

### Developing Your Application

#### Configuration

##### `app/entry.js`

This file serves two purposes:

1. It's imported first thing in Earthling's entry point script, and thus should contain anything that needs to run immediately, like CSS imports (see below).
2. It exports a function, `init(store)` that is called after your Redux store is created but before your React component tree is rendered. You can use it to initialize anything that depends on your Redux store.

##### `app/config/DevTools.js`

You can customize the component tree that Redux DevTools's [`createDevTools()` wraps](https://github.com/gaearon/redux-devtools#create-a-devtools-component) here. For example, you could change the monitor being used, or add a [filter monitor](https://github.com/zalmoxisus/redux-devtools-filter-actions) to ignore certain actions.

##### `app/config/history.js`

You can customize the [history](https://github.com/rackt/react-router/blob/master/docs/guides/basics/Histories.md) that React-Router uses here. By default, the app uses the `browserHistory` history, but not all backends will support this.

##### `app/config/middleware.js`

This file contains the Redux middleware your reducers use, exported as an array. By default, it includes the useful `redux-thunk` middleware, but feel free to swap it out as you see fit.

##### `app/config/routes.js`

This file contains your react-router route tree.

#### Reducer Magic

To remove a small bit of annoying boilerplate, Earthling is configured to automatically import all top-level JavaScript files in your `reducers/` folder and pass them to your store. The reducer will be available in your state tree under its filename (so the state from `reducers/foo.js` is available at `state.foo`).

#### Writing Tests

Similarly, tests are also automatically imported. Any file in `app/` ending with `.spec.js` will be included by the test entry point.

Earthling is configured to use the popular [Mocha](https://mochajs.org/) testing framework. You can bring any assertion library you like; the default template includes an example test using @mjackson's excellent [expect](https://github.com/mjackson/expect) library.

#### Customizing Webpack

#### Using NODE_ENV

#### Public API

Earthling contains a public API that can be used within your app.

##### `createStore`

You can access the final `createStore()` method used by Earthling to create your Redux store:

```js
import {createStore} from 'earthling';

const store = createStore();
```

This is useful for tests that require a full store instance.

### Common Tasks

#### I want to proxy requests to a backend server during development

*how to use webpack-dev-server config*

#### I want to use Immutable JS

*just import it and use in a reducer - nothing special required*

#### I want to add a CSS preprocessor

*webpack loaders*

#### I want to bundle static assets

*talk webpack imports of assets, `file-loader`*

#### I want to deploy my app

Deploying apps is a really, really difficult problem to abstract, so Earthling purposely avoids trying. Instead, you can integrate `earthling build` as a step in a larger deploy plan.

Here are some resources on deploying static applications to popular services:

*insert links here*

#### I want to run my tests on a CI server

*talk headless vs. GUI testing, karma configuration*

#### I want to render my app on the server

Earthling purposely doesn't cover this use case, because server-side rendering generally requires a level of customization and bespoke code that makes it hard to abstract over. You'll want to see the below section.

#### I want to stop using Earthling

The behind-the-curtain magic Earthling provides is easy to extract if you're ready to roll your own application scaffolding and tooling.

*what folders & files should they copy? include karma, webpack, etc...*

## Todos

* [ ] Clean up template eslintrc
* [ ] Redux Hot Module Reloading
  * https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/redux/create.js#L27-L29
* [ ] Add way to import/use non-custom reducers (e.g. redux-form)
  * maybe `reducers/index.js` could export a hash of other reducers? might be confusing
* [ ] Clean up & document template project
  * [ ] Clean up/improve default custom webpack config
  * [x] Fill out readme
* [x] global cli should defer to local cli
  * ember-cli
* [x] Version under the generated project
* [x] Pass Karma options through `earthling test`
  * Give example under CI section of manual
* [x] Template generated project
  * [x] `package.json` name
  * [x] `<title>` name
* [x] Vendorize earthling's `node_modules`
* [x] Hot module reload

## Current Design Questions

It's tempting to add something like `earthling lint`, not requiring any user eslint configuration, but with the way linting is integrated with most editors this would mean extra user configuration. Leave it to the eslint CLI instead.
