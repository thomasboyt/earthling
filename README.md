An experiment in React without the boilerplate. Mostly not implemented.

This was split from the codebase from another React site generator I worked on called Peridot, so if you see anything weird/not working, it's probably because of that.

For an example project, see https://github.com/thomasboyt/outside

## Todos

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

## Hypothetical Manual

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

## Design Questions

Shipping this as a global module is a bad idea considering dependencies/etc might change and multiple installations would be wanted for different projects. Can this be globally *and* locally installed? e.g. Global installation only covers `earthling init`, and then you switch to the local installation? Can the global CLI tool be configured to look for and prefer a local installation? What does that even look like?

It's tempting to add something like `earthling lint`, not requiring any user eslint configuration, but with the way linting is integrated with most editors this would mean extra user configuration. Leave it to the eslint CLI instead.
