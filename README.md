# Web-Starter-Kit

It is a starter-kit to manage your project easily and effectively.

## Features

+ Live Reloading
+ Use SASS
+ CSS Autoprefixer
+ HTML, CSS, Javascript Minification
+ Image Compression

## Folder Structure
```
├── app
|    ├── images
|    ├── scripts
|    ├── styles
|    ├── favicon.ico
|    ├── index.html
|    ├── manifest.json
|    ├── robots.txt
|    └── service-worker.js
├── public
├── .gitignore
├── bower.json
├── gulpfile.js
├── LICENSE
├── package.json
└── READEME.md
```

## How to Use

To use this kit you must have [node.js](https://nodejs.org/en/) and [sass](http://sass-lang.com/) installed in your system. 
Considering that you have already installed [node.js](https://nodejs.org/en/) and [sass](http://sass-lang.com/), 
open the **pwa-starter-kit** folder in command line and enter the following command.

### Install the dependencies
```
$ npm install --global gulp && npm install
```
This command will install all the dependencies required by the kit.

### Start the server and watch for the changes
```
$ gulp serve
```
This will create a local server at locahost:3000.

That's all you have to do to get up and running with the kit. Now focus on creating the project and let the kit manage the complexity for you.

### Generate the production ready code
```
$ gulp serve:public
```
This will generate a public directory with all your minified html, css and javascript files and also create a local server at locahost:3001 to view your production ready project.

**Caution:** Do not try to manipulate file in public folder because it is auto generated code.