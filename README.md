# Earthling

Earthling is an opinionated wrapper around React, Redux, React-Router, Babel, and Webpack. Think of it as a build tool and (tiny) framework.

## Why?

Applications built using the modern "React stack" seem to require an [awful lot of boilerplate](https://github.com/xgrommx/awesome-redux#boilerplate) that developers have to manage themselves. Meanwhile, more opinionated frameworks like Ember are able to easily provide [kickass CLI tooling](https://guides.emberjs.com/v2.2.0/getting-started/ember-cli/) that makes it much easier to get up and running.

Earthling attempts to build tooling for React by applying some (hopefully agreeable) opinions on how an application should be structured. It's able to abstract some of the usual configuration required for tools like Babel, Webpack, and Karma, while still providing hooks for extending and customizing their configuration.

Earthling also tries to abstract some of the most common problems in setting up Redux applications: store boilerplate, DevTools boilerplate, and hot module reloading configuration.

One problem Earthling isn't currently targeting is universal (isomorphic) rendering. This is a really complex topic with a lot of churn that mostly requires bespoke solutions, unfortunately. Long-term, Earthling may be able to provide pieces of functionality that are used in universal apps, but probably won't ever be able to provide a full framework for them.

## Manual

### Installation

First, make sure you have Node >=4.x and NPM >= 3.x. Earthling might work with other versions, but I wouldn't recommend it.

Install the tool:

```
npm install -g earthling
```

Create a init example app:

```
earthling new my-app
```

And run it:

```
cd my-app/
earthling serve
```

### Developing Your Application

#### Configuration

* `config/DevTools.js`
* `config/history.js`
* `config/middleware.js`
* `config/routes.js`
* `entry.js`

#### Customizing Webpack

#### Reducer Magic

#### Using NODE_ENV

### Commands

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

#### `earthling build`

Build your application to `build/`. Defaults to an optimized/minified build.

Options:

* `--dev`: Create a development environment build

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
