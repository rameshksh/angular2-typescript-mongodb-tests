/* global System */
/* global __karma__ */
/* global System */
/* global __karma__ */

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function () { };

// Set the base url of our scripts
System.baseURL = '/base/dist/dev/';
// Here we set all the preffixes so that we'll
// be able for example to import 'test/test_name'
// instead of 'scripts/dist/test_name'
System.paths = {    
    'app/components/home/*': '/base/dist/dev/app/components/home/*.js',
    'app/components/movie/*': '/base/dist/dev/app/components/movie/*.js',
    'app/services/*': '/base/dist/dev/app/services/*.js',
    'app/models/*': '/base/dist/dev/app/models/*.js',
    'app/common/*': '/base/dist/dev/app/common/*.js',

    'tests/unit/app/components/movie/*': '/base/dist/dev/tests/unit/app/components/movie/*.js',
    'tests/unit/app/components/home/*': '/base/dist/dev/tests/unit/app/components/home/*.js',
    'tests/unit/app/models/*': '/base/dist/dev/tests/unit/app/models/*.js',
    'tests/unit/app/services/*': '/base/dist/dev/tests/unit/app/services/*.js',

    'server/controllers/*': '/base/dist/dev/server/controllers/*.js',
    'server/repository/*': '/base/dist/dev/server/repository/*.js',
    'server/services/*': '/base/dist/dev/server/services/*.js',
    'server/routes/*': '/base/dist/dev/server/routes/*.js',

    'tests/unit/server/controllers/*': '/base/dist/dev/tests/unit/server/controllers/*.js',
    'tests/unit/server/services/*': '/base/dist/dev/tests/unit/server/services/*.js',
    'tests/unit/server/repository/*': '/base/dist/dev/tests/unit/server/repository/*.js',
    'tests/unit/server/models/*': '/base/dist/dev/tests/unit/server/models/*.js',
    'tests/unit/server/routes/*': '/base/dist/dev/tests/unit/server/routes/*.js',

    'angular2/*': '/base/dist/dev/app/lib/angular2.js',
    'rx': 'rx'
};

// paths that include spec and ends with .js
function onlySpecFiles(path) {   
    return /Spec\.js$/.test(path);
}

// takes paths and normalize them to module names
// by removing a base url preffix and .js suffix
function karmaFileToModule(fileName) {
    return fileName.replace(System.baseURL, '')
      .replace('.js', '');

    //var str = fileName.split('\\').pop().split('/').pop()
    //return str.replace('.js', '');
}

Promise.all(
    Object.keys(window.__karma__.files) // Takes all files that served by karma
        .filter(onlySpecFiles)  // choose only test files
        .map(karmaFileToModule) // normalize them to module names
        .map(function (moduleName) {
           
            return System.import(moduleName) // import each module
                .then(function (module) {                  
                    if (module.hasOwnProperty('main')) {
                        module.main(); //expose the tests
                    } else {
                        throw new Error('Module ' + moduleName + ' does not implement main() method.');
                    }
                });
        })).then(function () {
            __karma__.start(); // after all tests were exposed 
        }, function (error) {
            console.error(error.stack || error);
            __karma__.start();
        });