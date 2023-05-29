# s7chak.github.io

A lightweight, flexible Webpack setup with React for building a multi-page portfolio website. This setup allows you to incorporate React components into specific sections of your pages without turning it into a Single Page Application (SPA) with only a <div id="app"> in the body tag.

Features

Webpack configuration for multi-page application development
Integration of React components within specific sections of the pages
Hashed filenames for webpack bundles
Code linting using Airbnb style guide
CSS modules support with example CSS styles
Minification of webpack bundles with TerserPlugin
File loader for importing fonts and images with an example product image
Getting Started

Follow the steps below to install and run the portfolio website:

Prerequisites
Node.js and npm should be installed on your machine.
Installation
Clone the repository:
```
$ git clone https://github.com/s7chak/s7chak.github.io.git
```

  Navigate to the project directory:
```
$ cd s7chak.github.io
  ```

  Install dependencies:
```
$ npm install
  ```
  
  
  Development & Build

  Development Mode

To start the development server with hot module replacement and automatically open the browser, run:

```
$ npm run start
  ```

  ##
  # Production Build

  To build the project in production mode for improved load time, including minified bundles and lighter weight source maps, run:

```
$ npm run build
  ```
  
Linting
To check for lint errors in the src directory, run:


For more details on this setup, you can refer to the accompanying Medium post here.
