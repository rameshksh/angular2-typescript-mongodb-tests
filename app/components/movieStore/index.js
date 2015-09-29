/// <reference path='../../../typings/tsd.d.ts' />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var angular2_2 = require('angular2/angular2');
var menu_1 = require('common/menu');
var Movies = (function () {
    function Movies(proxyService) {
        this.proxyService = proxyService;
        this.movies = [];
        this.menus = [];
        this.menus.push(new menu_1.Menu('title', 'A-Z', 'asc'));
        this.menus.push(new menu_1.Menu('year', 'year', 'desc'));
        this.menus.push(new menu_1.Menu('rating', 'rating', 'desc'));
        this.menus.push(new menu_1.Menu('review', 'User Review', 'desc'));
        this.menus.push(new menu_1.Menu('collection', 'Box Collection', 'desc'));
    }
    Movies.prototype.getMovies = function () {
        var _this = this;
        this.proxyService.getMovies(null, null).then(function (response) {
            _this.movies = response;
        });
    };
    Movies.prototype.getDetails = function (event, id) {
        window.location.href = '/movies/detail/' + id;
    };
    Movies.prototype.getByFilters = function (sortKey, sortOrder) {
        var _this = this;
        this.menus.forEach(function (item) {
            if (item.sortKey == sortKey) {
                if (item.order == 'asc') {
                    item.order = 'desc';
                }
                else {
                    item.order = 'asc';
                }
            }
        });
        this.proxyService.getMovies(sortKey, sortOrder).then(function (response) {
            _this.movies = response;
        });
    };
    Movies.prototype.onInit = function () {
        this.getMovies();
    };
    Movies.prototype.onChange = function () {
        this.getMovies();
    };
    Movies = __decorate([
        angular2_1.Component({
            selector: 'component-1'
        }),
        angular2_1.View({
            templateUrl: './components/moviestore/index.html?v=<%= VERSION %>',
            directives: [router_1.RouterLink, angular2_2.NgFor, angular2_2.NgIf]
        })
    ], Movies);
    return Movies;
})();
exports.Movies = Movies;
//# sourceMappingURL=index.js.map