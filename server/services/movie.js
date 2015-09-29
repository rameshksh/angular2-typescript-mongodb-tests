var MovieService = (function () {
    function MovieService(repository) {
        this.repository = repository;
    }
    MovieService.prototype.create = function () {
        this.repository.create();
    };
    MovieService.prototype.getMovies = function () {
        return this.repository.read();
    };
    MovieService.prototype.getMovieDetails = function (id) {
    };
    MovieService.prototype.update = function (id) {
        return this.repository.update(id);
    };
    MovieService.prototype.delete = function (id) {
        return this.repository.delete(id);
    };
    return MovieService;
})();
exports.MovieService = MovieService;
//# sourceMappingURL=movie.js.map