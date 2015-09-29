/// <reference path='../typings/tsd.d.ts' />
var IndexRoute = (function () {
    function IndexRoute(app) {
        this.app = app;
    }
    IndexRoute.prototype.get = function () {
        this.app.get('/', function (req, res) {
            return res.render('index.html');
        });
    };
    return IndexRoute;
})();
exports.IndexRoute = IndexRoute;
//# sourceMappingURL=index.js.map