/// <reference path='typings/tsd.d.ts' />

import gulp = require("gulp");
//import inject = require('gulp-inject');
import less = require('gulp-less');
import plumber = require('gulp-plumber');
import sourcemaps = require('gulp-sourcemaps');
import tsc = require('gulp-typescript');
import watch = require('gulp-watch');
import del = require('del');
import fs = require('fs');
import path = require('path');
import join = path.join;
import runSequence = require('run-sequence');
import express = require('express');
import serveStatic = require('serve-static');
import openResource = require('open');
import nodemon = require('gulp-nodemon');

//import {TestMain} from './tests/config/test-main';

var tinylr = require('tiny-lr')(),
    connectLivereload = require('connect-livereload'),
    shell = require('gulp-shell'),
    inject = require('gulp-inject'),
    template = require('gulp-template'),
    Builder = require('systemjs-builder'),
    karma = require("gulp-karma-runner"),
    KarmaServer = require('karma').Server,
    jasmime = require("jasmine"),
    browserify = require("browserify"),
    buffer = require("vinyl-buffer"),
    source = require("vinyl-source-stream"),   
    inlineNg2Template = require('gulp-inline-ng2-template'),
    liveServer = require('gulp-live-server');
//nodeInspector = require('gulp-node-inspector'),
//karma = require('gulp-karma'),



var typescript: gulp.GulpPlugin = tsc; // this would be the TypeScript compiler
var jasmine: gulp.GulpPlugin = jasmime;

// --------------
// Configuration.
var APP_BASE = '/';

var config = {
    PATH: {
        dest: {
            all: 'dist',
            dev: {
                base: 'dist/dev',
                all: 'dist/dev/app',
                lib: 'dist/dev/app/lib',
                css: 'dist/dev/app/css',
                ng2: 'dist/dev/app/lib/angular2.js',
                router: 'dist/dev/app/lib/router.js',
                server: 'dist/dev/server',
                views: 'dist/dev/server/views',
                tests: 'dist/dev/tests',
                appTests: 'dist/dev/tests/unit/app',
                serverTests: 'dist/dev/tests/unit/server',
            }
        },
        src: {
            // Order is quite important here for the HTML tag injection.
            lib: [
                './node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
                './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js',
                './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js.map',
                './node_modules/reflect-metadata/Reflect.js',
                './node_modules/reflect-metadata/Reflect.js.map',
                './node_modules/systemjs/dist/system.src.js',
                './node_modules/angular2/node_modules/zone.js/dist/zone.js',
                './node_modules/es6-promise/dist/es6-promise',
                './node_modules/jquery/dist/jquery.js',
                './node_modules/jquery/dist/jquery.js.map',
                './node_modules/bootstrap/dist/js/bootstrap.js',
                './node_modules/bootstrap/dist/css/bootstrap.css',
                './node_modules/bootstrap/dist/css/bootstrap.css.map'
            ],
            app: ['./app/**/*.ts'],
            server: ['./server/**/*.ts'],
            appTests: ['./tests/unit/app/**/**/*Spec.ts', './tests/unit/app/**/**Spec.ts'],
            serverTests: ['./tests/unit/server/**/**Spec.ts']
        }
    },

    PORT: 3002,
    LIVE_RELOAD_PORT: 4004,

    ng2Builder: new Builder({
        paths: {
            'angular2/*': 'node_modules/angular2/es6/dev/*.js',
            rx: 'node_modules/angular2/node_modules/rx/dist/rx.js'
        },
        meta: {
            rx: {
                format: 'cjs'
            }
        }
    }),

    HTMLMinifierOpts: { conditionals: true },

    tsProject: tsc.createProject('tsconfig.json', {
        typescript: require('typescript')
    })
};

var utils = {
    getVersion: function () 
    {
        //var pkg = JSON.parse(fs.readFileSync('package.json'));
        return '1.0.0';//pkg.version;
    },

    transformPath: function (env) 
    {
        var v = '?v=' + this.getVersion();
        return function (filepath)
        {
            var filename = filepath.replace('/' + config.PATH.dest[env].all, '') + v;
            arguments[0] = join(APP_BASE, filename);
            return inject.transform.apply(inject.transform, arguments);
        };
    },

    notifyLiveReload: function (e) 
    {
        var fileName = e.path;
        tinylr.changed({
            body: {
                files: [fileName]
            }
        });
    },

    injectableDevAssetsRef: function() 
    {
        var src = config.PATH.src.lib.map((path) =>
        {
            return join(config.PATH.dest.dev.lib, path.split('/').pop());
        });

        src.push(config.PATH.dest.dev.ng2,
            config.PATH.dest.dev.router,
            join(config.PATH.dest.dev.all, '**/*.css'));

        return src;
    },

    templateLocals: function ()
    {
        return {
            VERSION: this.getVersion(),
            APP_BASE: APP_BASE
        }
    },

    serveSPA: function (env)
    {
        var app;
        app = express().use(APP_BASE,
            connectLivereload({ port: config.LIVE_RELOAD_PORT }),
            serveStatic(join(__dirname, config.PATH.dest[env].all)));

        app.all(APP_BASE + '*', function (req, res, next)
        {
            res.sendFile(join(__dirname, config.PATH.dest[env].all, 'index.html'));
        });

        app.listen(config.PORT, function ()
        {
            openResource('http://localhost:' + config.PORT + APP_BASE);
        });
    }
};

// --------------
// Clean.

var testReporter = function (output, file, options)
{
    // file is a reference to the vinyl File object
    console.log("Found " + output.length + " errors in " + file.path);
    // options is a reference to the reporter options, e.g. including the emitError boolean
};


gulp.task('clean', (done) =>
{
    del(config.PATH.dest.all, done);
});


// --------------
// Build dev.

gulp.task('build.ng2', () =>
{
    config.ng2Builder.build('angular2/router', config.PATH.dest.dev.router, {});
    return config.ng2Builder.build('angular2/angular2', config.PATH.dest.dev.ng2, {});
});


gulp.task('build.lib', ['build.ng2'], () =>
{
    return gulp.src(config.PATH.src.lib)
        .pipe(gulp.dest(config.PATH.dest.dev.lib));
});

gulp.task('build.client.js',  () =>
{
    var result = gulp.src(config.PATH.src.app)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(tsc(config.tsProject));

    return result.js
        .pipe(sourcemaps.write('/maps', { includeContent: false, sourceRoot: '/' }))
        .pipe(template(utils.templateLocals()))
        .pipe(gulp.dest(config.PATH.dest.dev.all));
});

gulp.task('build.server.js', () =>
{
    var result = gulp.src(config.PATH.src.server)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(tsc(config.tsProject));

    return result.js
        .pipe(sourcemaps.write('/maps', { includeContent: false, sourceRoot: '/' }))
        .pipe(template(utils.templateLocals()))
        .pipe(gulp.dest(config.PATH.dest.dev.server));
});

gulp.task('build.js', () =>
{
    var result = gulp.src(['./*.ts'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(tsc(config.tsProject));

    return result.js
        .pipe(sourcemaps.write())
        .pipe(template(utils.templateLocals()))
        .pipe(gulp.dest(config.PATH.dest.dev.base));
});
gulp.task('build.less',  () =>
{
    return gulp.src('./app/less/*.less')
        .pipe(less({
        paths: [path.join(__dirname, 'less', 'includes')]
    }))
        .pipe(gulp.dest(config.PATH.dest.dev.css));
});

gulp.task('build.components', ['build.client.js'], () =>
{
    return gulp.src(['./app/**/**/*.html'])
        .pipe(gulp.dest(config.PATH.dest.dev.all));
});

gulp.task('build.index', () =>
{
    var target = gulp.src(utils.injectableDevAssetsRef(), { read: false });
    return gulp.src('./server/views/index.html')
        .pipe(inject(target, { transform: utils.transformPath('dev') }))
        .pipe(template(utils.templateLocals()))
        .pipe(gulp.dest(config.PATH.dest.dev.base));
});

//gulp.task('build.index', function ()
//{
//    var target = gulp.src(utils.injectableDevAssetsRef(), { read: false });
//    return gulp.src('./server/views/index.html')
//        .pipe(inject(target, {
//            starttag: "<head>",
//            endtag: "</head>",
//            transform: (filepath, file, i, length) =>
//            {
//                console.log(file);

//                var filename = filepath.replace('/' + config.PATH.dest.dev.all, '');
//                var srcPath = join(APP_BASE, filename);

//                if (srcPath.indexOf('.css') !== -1)
//                {
//                    return '<link rel="stylesheet" href="' + srcPath + '" >';
//                }
//                else
//                {
//                    return "<script src='" + srcPath + "'></script>";
//                }
//            }
//        }))
//        .pipe(template(utils.templateLocals()))
//        .pipe(gulp.dest(config.PATH.dest.dev.base));
//});


gulp.task('build.server', (done) =>
{
    runSequence('build.js', 'build.server.js', done);
});

gulp.task('build.assets', (done) =>
{
    runSequence('build.components', 'build.less', done);
});


gulp.task('build.app', (done) =>
{
    runSequence('build.assets', 'build.index', done);
});

gulp.task('build.all', (done) =>
{
    runSequence('build.lib', 'build.server', 'build.app', done);
});

// Livereload.

gulp.task('livereload', () =>
{
    tinylr.listen(config.LIVE_RELOAD_PORT);
});

//******************************************************************************
//* BUNDLE
//******************************************************************************

gulp.task('watch', (cb) =>
{
    watch(['gulpFile.ts'], (e) =>
    {
        runSequence('build', 'build.tests', () =>
        {
            utils.notifyLiveReload(e);
        });
    });
    watch(['./app/less/**'], (e) =>
    {
        runSequence('build.less', () =>
        {
            utils.notifyLiveReload(e);
        });
    });
    watch(['./app/**'], (e) =>
    {
        runSequence('build.components', () =>
        {
            utils.notifyLiveReload(e);
        });
    });

    watch(['./server/**'], (e) =>
    {
        runSequence('build.server', () =>
        {
            utils.notifyLiveReload(e);
        });
    });

    watch(['./tests/**'], (e) =>
    {
        runSequence('build.tests', () =>
        {
            utils.notifyLiveReload(e);
        });
    });
});

// --------------
// Test.
// tests
gulp.task('cleanTests', (done) =>
{
    return del(config.PATH.dest.dev.tests, done);
});

gulp.task('build.app.tests', (done) =>
{
    return gulp.src(config.PATH.src.appTests)
        .pipe(sourcemaps.init())
        .pipe(tsc(config.tsProject))
        .pipe(sourcemaps.write('/maps', { includeContent: false, sourceRoot: '/' })) //'/maps', { includeContent: false, sourceRoot: '/tests' })
        .pipe(gulp.dest(config.PATH.dest.dev.appTests), done);
});

gulp.task('build.server.tests', (done) =>
{
    return gulp.src(config.PATH.src.serverTests)
        .pipe(sourcemaps.init())
        .pipe(tsc(config.tsProject))
        .pipe(sourcemaps.write('/maps', { includeContent: false, sourceRoot: '/' })) //'/maps', { includeContent: false, sourceRoot: '/tests' })
        .pipe(gulp.dest(config.PATH.dest.dev.serverTests), done);
});


gulp.task('build', (done) =>
{
    runSequence('build.all', 'build.tests', done);
});

gulp.task('build.tests', (done) => {
    runSequence('build.app.tests', 'build.server.tests', done);
});

gulp.task('serve', (e) =>
{
    runSequence('build.all', 'livereload' , 'default', () =>
    {
        utils.notifyLiveReload(e);
    });
});

// --------------
// Serve dev.

gulp.task('run', () => {

    var server = liveServer.new(config.PATH.dest.dev.base + '/start.js');
    server.start();

    gulp.watch(config.PATH.dest.dev.all, (file) => {
        server.notify.apply(server, [file]);
    });

    gulp.watch(config.PATH.dest.dev.base + '/start.js', server.start.bind(server));

});


gulp.task('default', ['run', 'watch']);



gulp.task('karma', (done) =>
{
    new KarmaServer({
        configFile: __dirname + '/tests/config/karma.conf.js',
        singleRun: false
    }, done).start();
})



gulp.task("test", (done) =>
{
    runSequence('cleanTests',
        'build.tests',       
        'karma', done);
});