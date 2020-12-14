# TypeScript - Pixi Boilerplate

This is a (virtually) empty project that should compile a typescript project that uses the Pixi.js renderer.

Use it as a sandbox to experiement with stuff. Just make sure you keep master clean, empty and up to date!

## Requirements
* [Node.js](http://nodejs.org/) - an asynchronous event driven javascript framework (version 11 required)
* [NPM](https://www.npmjs.com/) - a package manager for javascript.

Clone, branch, then run

```
$ bash setup-project.sh
```
Or if you are not using a bashable terminal
```
$ setup-project.bat
```

Then to launch:
```
$ gulp
```

## Troubleshooting
Sometimes you may find not all the packages install first time round (often Typescript), if, so just run another 
```
$ npm i
```

If you have trouble with gulp you may need to manually run a

```
$ npm install gulp -g
```
Just make sure you don't accidentally install gulp 4 - v4 upgrade to the scripts is coming soon!
