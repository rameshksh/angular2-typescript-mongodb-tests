/// <reference path='../typings/tsd.d.ts' />
var movie_1 = require('../services/movie');
var movie_2 = require('../repository/movie');
var movie_3 = require('../controllers/movie');
var MoviesRoute = (function () {
    function MoviesRoute(app, db) {
        this.app = app;
        this.db = db;
    }
    MoviesRoute.prototype.getRoutes = function () {
        var repository = new movie_2.MovieRepository(this.db);
        var service = new movie_1.MovieService(repository);
        var movieController = new movie_3.MoviesController(service);
        this.app.get('/movies', function (req, res) {
            movieController.getMovies().then(function (response) {
                res.send(response);
            });
        });
    };
    return MoviesRoute;
})();
exports.MoviesRoute = MoviesRoute;
//# sourceMappingURL=movies.js.map