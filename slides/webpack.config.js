var getConfig = require('hjs-webpack')
var config = require('./presentation/config');

var webpackConfig = getConfig({
  in: './index.jsx',
  out: 'dist',
  clearBeforeBuild: true,
  html: config.html
});

console.log(webpackConfig.constructor)

//var webpackConfig = {
//  "entry": [
//    "webpack-dev-server/client?http://localhost:3000",
//    "webpack/hot/only-dev-server",
//    "/Users/alanfoster/Documents/Shopkeep/js/JS-Game/slides/index.jsx"
//  ],
//  "output": {
//    "path": "/Users/alanfoster/Documents/Shopkeep/js/JS-Game/slides/dist/",
//    "filename": "app.js",
//    "cssFilename": "app.css",
//    "hash": false,
//    "publicPath": "/"
//  },
//  "resolve": {
//    "extensions": [
//      "",
//      ".js",
//      ".jsx",
//      ".json"
//    ]
//  },
//  "plugins": [
//    {
//      "config": {
//        "isDev": true,
//        "serveCustomHtmlInDev": true,
//        "package": {
//          "name": "spectacle",
//          "version": "0.0.5",
//          "description": "ReactJS Powered Presentation Framework",
//          "main": "index.js",
//          "scripts": {
//            "start": "webpack-dev-server",
//            "lint": "eslint --ext .js,.jsx src",
//            "build": "webpack",
//            "deploy": "npm run build && surge -p ./dist"
//          },
//          "author": "",
//          "license": "ISC",
//          "dependencies": {
//            "alt": "^0.16.10",
//            "highlight.js": "^8.6.0",
//            "hjs-webpack": "^2.8.1",
//            "lodash": "^3.9.3",
//            "normalize.css": "^3.0.3",
//            "object-assign": "^3.0.0",
//            "radium": "^0.13.2",
//            "react": "^0.13.3",
//            "react-router": "1.0.0-beta2",
//            "react-tween-state": "0.0.5",
//            "style-loader": "^0.12.3",
//            "stylus-loader": "^1.2.1",
//            "tween-functions": "^1.0.2"
//          },
//          "devDependencies": {
//            "autoprefixer-core": "^5.2.1",
//            "babel": "^5.6.14",
//            "babel-core": "^5.6.15",
//            "babel-eslint": "^3.1.23",
//            "babel-loader": "^5.2.2",
//            "css-loader": "^0.15.1",
//            "eslint": "^0.24.0",
//            "eslint-config-defaults": "^3.0.3",
//            "eslint-plugin-react": "^2.6.4",
//            "file-loader": "^0.8.4",
//            "json-loader": "^0.5.2",
//            "node-libs-browser": "^0.5.2",
//            "raw-loader": "^0.5.1",
//            "react-hot-loader": "^1.2.7",
//            "surge": "latest",
//            "url-loader": "^0.5.6",
//            "webpack": "^1.10.0",
//            "webpack-dev-server": "^1.10.0"
//          }
//        }
//      },
//      "filename": "index.html"
//    },
//    {},
//    {}
//  ],
//  "module": {
//    "loaders": [
//      {
//        "test": {},
//        "exclude": {},
//        "loaders": [
//          "react-hot",
//          "babel-loader"
//        ]
//      },
//      {
//        "test": {},
//        "loaders": [
//          "json"
//        ]
//      },
//      {
//        "test": {},
//        "loader": "url-loader?limit=10000"
//      },
//      {
//        "test": {},
//        "loader": "url-loader?limit=10000"
//      },
//      {
//        "test": {},
//        "loaders": [
//          "jade"
//        ]
//      },
//      {
//        "test": {},
//        "loader": "style-loader!css-loader!postcss-loader"
//      },
//      {
//        "test": {},
//        "loader": "style-loader!css-loader!postcss-loader!stylus-loader"
//      }
//    ]
//  },
//  "stylus": {
//    "use": [
//      null
//    ]
//  },
//  "postcss": [
//    null
//  ],
//  "spec": {
//    "in": "./index.jsx",
//    "out": "dist",
//    "clearBeforeBuild": true,
//    "entry": "/Users/alanfoster/Documents/Shopkeep/js/JS-Game/slides/index.jsx",
//    "output": {
//      "path": "/Users/alanfoster/Documents/Shopkeep/js/JS-Game/slides/dist/",
//      "filename": "app.js",
//      "cssFilename": "app.css",
//      "hash": false,
//      "publicPath": "/"
//    },
//    "configFile": null,
//    "isDev": true,
//    "package": {
//      "name": "spectacle",
//      "version": "0.0.5",
//      "description": "ReactJS Powered Presentation Framework",
//      "main": "index.js",
//      "scripts": {
//        "start": "webpack-dev-server",
//        "lint": "eslint --ext .js,.jsx src",
//        "build": "webpack",
//        "deploy": "npm run build && surge -p ./dist"
//      },
//      "author": "",
//      "license": "ISC",
//      "dependencies": {
//        "alt": "^0.16.10",
//        "highlight.js": "^8.6.0",
//        "hjs-webpack": "^2.8.1",
//        "lodash": "^3.9.3",
//        "normalize.css": "^3.0.3",
//        "object-assign": "^3.0.0",
//        "radium": "^0.13.2",
//        "react": "^0.13.3",
//        "react-router": "1.0.0-beta2",
//        "react-tween-state": "0.0.5",
//        "style-loader": "^0.12.3",
//        "stylus-loader": "^1.2.1",
//        "tween-functions": "^1.0.2"
//      },
//      "devDependencies": {
//        "autoprefixer-core": "^5.2.1",
//        "babel": "^5.6.14",
//        "babel-core": "^5.6.15",
//        "babel-eslint": "^3.1.23",
//        "babel-loader": "^5.2.2",
//        "css-loader": "^0.15.1",
//        "eslint": "^0.24.0",
//        "eslint-config-defaults": "^3.0.3",
//        "eslint-plugin-react": "^2.6.4",
//        "file-loader": "^0.8.4",
//        "json-loader": "^0.5.2",
//        "node-libs-browser": "^0.5.2",
//        "raw-loader": "^0.5.1",
//        "react-hot-loader": "^1.2.7",
//        "surge": "latest",
//        "url-loader": "^0.5.6",
//        "webpack": "^1.10.0",
//        "webpack-dev-server": "^1.10.0"
//      }
//    },
//    "replace": null,
//    "port": 3000,
//    "hostname": "localhost",
//    "urlLoaderLimit": 10000,
//    "serveCustomHtmlInDev": true,
//    "devServer": {
//      "info": false,
//      "historyApiFallback": true,
//      "hot": true,
//      "contentBase": "/Users/alanfoster/Documents/Shopkeep/js/JS-Game/slides/dist",
//      "port": 3000,
//      "host": "localhost"
//    }
//  },
//  "devtool": "eval",
//  "devServer": {
//    "info": false,
//    "historyApiFallback": true,
//    "hot": true,
//    "contentBase": "/Users/alanfoster/Documents/Shopkeep/js/JS-Game/slides/dist",
//    "port": 3000,
//    "host": "localhost"
//  }
//};

//webpackConfig.resolve.modulesDirectories = [
//  "./../app/assets/js"
//];

webpackConfig.module.loaders[0] = {
  test: /(\.js$)|(\.jsx$)/,
  exclude: /node_modules/,
  loaders: [
    'babel-loader?stage=1'
  ]
}

if (process.argv[1].indexOf('webpack-dev-server') !== -1) {
  webpackConfig.module.loaders[0].loaders.unshift('react-hot')
}

module.exports = webpackConfig;
