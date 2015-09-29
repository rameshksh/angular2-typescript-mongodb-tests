var MoviesController = (function () {
    function MoviesController(service) {
        this.movieService = service;
    }
    MoviesController.prototype.createMovie = function () {
        return (this.movieService.create());
    };
    MoviesController.prototype.getMovies = function () {
        return this.movieService.getMovies();
    };
    MoviesController.prototype.getMovieDetails = function () {
        var id = "";
        return this.movieService.getMovieDetails(id);
    };
    MoviesController.prototype.updateMovie = function () {
        var id = "";
        return this.movieService.update(id);
    };
    MoviesController.prototype.deleteMovie = function () {
        var id = "";
        return this.movieService.delete(id);
    };
    return MoviesController;
})();
exports.MoviesController = MoviesController;
//# sourceMappingURL=movie.js.map