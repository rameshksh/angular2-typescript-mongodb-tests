/// <reference path='../../typings/tsd.d.ts' />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var angular2_1 = require('angular2/angular2');
var ProxyService = (function () {
    function ProxyService(http) {
        this.http = http;
    }
    ProxyService.prototype.getMovieById = function (id) {
        var httpService = this.http;
        return new Promise(function (resolve, reject) {
            httpService.get('http://localhost:3000/api/movies/get/' + id).toRx().subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ProxyService.prototype.getMovies = function (sortKey, sortOrder) {
        var httpService = this.http;
        if (sortKey && sortOrder) {
            return new Promise(function (resolve, reject) {
                httpService.request('http://localhost:3000/api/movies/getall?sortKey=' + sortKey + '&sortOrder=' + sortOrder).toRx().subscribe(function (res) { return resolve(res.json()); });
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                httpService.request('http://localhost:3000/api/movies/getall').toRx().subscribe(function (res) { return resolve(res.json()); });
            });
        }
    };
    ProxyService.prototype.getTopMovies = function () {
        var httpService = this.http;
        return new Promise(function (resolve, reject) {
            httpService.request('http://localhost:3000/api/movies/gettop').toRx().subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ProxyService = __decorate([
        angular2_1.Injectable()
    ], ProxyService);
    return ProxyService;
})();
exports.ProxyService = ProxyService;
//# sourceMappingURL=proxyService.js.map