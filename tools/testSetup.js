process.env.NODE_ENV = "test";

// register babel that it transpiles before test run
require('babel-register')();


// disbale webpack-specific features
require.extensions['.css'] = function(){return null;};
require.extensions['.png'] = function(){return null;};
require.extensions['.jpg'] = function(){return null;};


// configure jsdomvar and set gloval variables
jsdom = require('jsdom').jsdom;


var exposedProperties = ['window', 'navigator', 'document'];


global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent : 'node.js'
};
