/// <reference path='server/typings/tsd.d.ts' />
var express = require('express');
var MongoDB = require('mongodb');
var path = require('path');
var logger = require('winston');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var swig = require('swig');
var index_1 = require('./server/routes/index');
var movies_1 = require('./server/routes/movies');
var app = express();
MongoDB.MongoClient.connect("mongodb://localhost:27017/moviedb", function (err, db) {
    if (err)
        throw err;
    app.set('port', process.env.PORT || '3000');
    // Register our templating engine
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/server/views');
    app.set('view cache', true);
    swig.setDefaults({ cache: false });
    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '/dist/dev/app')));
    // create a write stream (in append mode) 
    logger.add(logger.transports.File, { filename: 'access.log' });
    //logger.remove(logger.transports.Console);
    logger.log('info', 'Application Started....');
    logger.log('info', __dirname);
    logger.level = 'debug';
    // Application routes
    new index_1.IndexRoute(app).get();
    new movies_1.MoviesRoute(app, db).getRoutes();
    http.createServer(app).listen(app.get('port'), function () {
        console.log("Express server listening on port " + app.get('port'));
    });
});
//# sourceMappingURL=start.js.map