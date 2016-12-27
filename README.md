# ngZimon
[![Build Status][travis-badge]][travis-badge-url]

This is Zimon, a simple dashboard for Zivis. 
The repository at hand contains the Angular 2 frontend.


## Developer SSetup

```bash
git clone git@github.com:realzimon/ng-zimon.git
cd ng-zimon
npm install
npm start
```

The `npm start` command first compiles the application, 
then simultaneously re-compiles and runs the `lite-server`.
Both the compiler and the server watch for file changes.

Shut it down manually with `Ctrl-C`.

For a CI environment, where you would only build once, try:

````bash
npm run tsc
````

[travis-badge]: https://travis-ci.org/realzimon/ng-zimon.svg?branch=master
[travis-badge-url]: https://travis-ci.org/realzimon/ng-zimon
