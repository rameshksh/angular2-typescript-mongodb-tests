// Karma configuration
// Generated on Tue Oct 28 2014 15:26:08 GMT+0530 (India Standard Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../../',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/traceur/bin/traceur-runtime.js',
            'node_modules/es6-module-loader/dist/es6-module-loader.js',
            'node_modules/systemjs/dist/system.js',
           'https://code.angularjs.org/2.0.0-alpha.34/angular2.dev.js',
            'https://code.angularjs.org/2.0.0-alpha.34/router.dev.js',
            'tests/config/test-main.js',
             {
                 pattern: 'dist/dev/tests/unit/app/**/*.js', included: false, served: true, watch: true
             },          
           {
               pattern: 'dist/dev/tests/unit/server/**/*.js', included: false, served: true, watch: true
           },
           {
               pattern: 'dist/dev/app/**/*.js', included: false, served: true, watch: true
           },
            {
                pattern: 'dist/dev/server/**/*.js', included: false, served: true, watch: true
            },

            'dist/dev/app/components/**/*.html'
        ],

        // list of files to exclude
        exclude: [
           // 'node_modules/**'
        ],

        preprocessors: {
            'dist/dev/app/components/**/*.html': ['redirect']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'html'],

        // web server port
        port: 8100,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-jasmine-html-reporter',
            'karma-redirect-preprocessor'
        ]
    });
};
