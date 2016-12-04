import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
// import finalhandler from 'finalhandler';
// import serveStatic from 'serve-static';


/* eslint-disable no-console */

const port = 3090;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));



app.get('*', function(req, res, next) {
  console.log("request:", req.originalUrl);
  if ( req.originalUrl === '/' || req.originalUrl === 'index.html') {
    console.log('sending index.html');
    return res.sendFile(path.join( __dirname, '../src/index.html'));
  } else {
    return next();
  }
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
