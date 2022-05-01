# Quick Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This package is designed to help build the boilerplate for Node servers quickly.

Much of the server file, routes, and MVC architecture is repeatable, with only simple name changes. This package will build the framework of your app, and you can quickly get to expanding and adding the complex features to your project.

## Table of Contents

If your README is long, add a table of contents to make it easy for users to find what they need.
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [Contribute](#contribute)

## Installation

Install with npm:

    npm i -D @Moses-Ian/quick-server

Create an index.js file with a require statement:

    require('@Moses-Ian/quick-server')()

And run it:

    node index

## Usage

The package uses inquirer to ask questions about your project. Once those are answered, your files will be output into ``dist/<PROJECT-NAME>``. Copy those files into your project and modify them as necessary.

**IMPORTANT**

This is a work in progress. Certain combinations lead to only partially complete files. Submit an issue if you believe a feature is broken or missing.

## Credits

This is made with code I learned from University of Arizona Coding Boot Camp.

It is entirely written by me.

## License

[MIT License](https://opensource.org/licenses/MIT)

I would appreciate a credit if you used this package.

## Features

Currently available technologies:

* Express
* MySQL
* sequelize
* MongoDB
* mongoose
* Handlebars
* Service Workers
* IndexedDB
* Web Manifest

## Contribute

If you want to contribute, feel free to fork and create a pull request. No promises on when it will be reviewed. You can tackle an issue or create your own.

The code can also be refactored. I kept changing my opinions on the style as I wrote and it shows.
