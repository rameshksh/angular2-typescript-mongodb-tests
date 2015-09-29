/// <reference path='../../../../../typings/tsd.d.ts' />

import {Injector, MockBackend, Http, BaseRequestOptions, bind} from 'angular2/angular2';
import {AppRootUrl} from 'angular2/angular2';

import {Review} from '../../../../../app/models/review';
import {Movie} from '../../../../../app/models/movie';
import {MovieIndex} from  '../../../../../app/components/movie/index';
import {ProxyService} from '../../../../../app/services/proxyService';

export function main() {
    describe('Home index component:', () => {
        var component: MovieIndex,
            movieList: Array<Movie>,
            proxyService: ProxyService;

        var getTopMoviesPromise: Promise<Array<Movie>>;

        beforeEach(() => {
            movieList = new Array<Movie>();

            var movie = new Movie();
            var review = new Review();

            movie.Id = 1;
            movie.Name = "Avtar";
            movie.Description = "Awesome Movie";
            movie.Genre = "Horror";
            movie.Rating = 5;
            movie.Year = "12/2/2005";
            movie.Collection = 100;
            movie.Language = "English";

            review.Title = "Good Movie";
            review.Description = "Must watch movie";
            review.ReviewDate = "12/2/2015";

            movie.Reviews = new Array<Review>();
            movie.Reviews.push(review);

            movieList.push(movie);
        });

        beforeEach(() => {

            proxyService = new ProxyService(http);

            component = new MovieIndex(proxyService);

            var http = new Http();

            getTopMoviesPromise = new Promise<Array<Movie>>(function (resolve, reject) { resolve(movieList) });

            spyOn(proxyService, "getMovies").and.returnValue(getTopMoviesPromise);
        });

        it("should initialize proxyService correctly", () => {
            expect(proxyService).toBeDefined();
        });

        it('should call getMovies on initialization', () => {
            component.getMovies();

            expect(proxyService.getMovies).toHaveBeenCalled();
        });

        it('should call getMovies on calling onInit function', () => {
            component.onInit();

            expect(proxyService.getMovies).toHaveBeenCalled();
        });

        it('should call getMovies on calling onChange function', () => {
            component.onChange();

            expect(proxyService.getMovies).toHaveBeenCalled();
        });

        it('should call getMovies on calling getByFilters when both params are not passed', () => {
            component.getByFilters('sdfd', 'sdf');

            expect(proxyService.getMovies).toHaveBeenCalled();
        });

        it('should not call getMovies on calling getByFilters when params are not passed', () => {
            component.getByFilters('','');

            expect(proxyService.getMovies).not.toHaveBeenCalled();
        });

        it('should not call getMovies on calling getByFilters when either params are not passed', () => {
            component.getByFilters('df', '');

            expect(proxyService.getMovies).not.toHaveBeenCalled();
        });

        it('should not call getMovies on calling getByFilters when either params are not passed', () => {
            component.getByFilters('', 'sdf');

            expect(proxyService.getMovies).not.toHaveBeenCalled();
        });

    });
}