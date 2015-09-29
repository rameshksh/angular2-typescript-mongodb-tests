/// <reference path='../../../../../typings/tsd.d.ts' />

import {Injector, MockBackend, Http, BaseRequestOptions, bind} from 'angular2/angular2';
import {AppRootUrl} from 'angular2/angular2';

import {Review} from '../../../../../app/models/review';
import {Movie} from '../../../../../app/models/movie';
import {MovieDetails} from  '../../../../../app/components/movie/details';
import {ProxyService} from '../../../../../app/services/proxyService';

export function main() {
    describe('Home index component:', () => {
        var component: MovieDetails,
            movie : Movie,            
            proxyService: ProxyService;

        var getTopMoviesPromise: Promise<Movie>;

        beforeEach(() => {           

            movie = new Movie();
            

            movie.Id = 1;
            movie.Name = "Avtar";
            movie.Description = "Awesome Movie";
            movie.Genre = "Horror";
            movie.Rating = 5;
            movie.Year = "12/2/2005";
            movie.Collection = 100;
            movie.Language = "English";

            var review = new Review();
            review.Title = "Good Movie";
            review.Description = "Must watch movie";
            review.ReviewDate = "12/2/2015";

            movie.Reviews = new Array<Review>();
            movie.Reviews.push(review);
        });

        beforeEach(() => {

            proxyService = new ProxyService(http);

            component = new MovieDetails(proxyService);

            var http = new Http();

            getTopMoviesPromise = new Promise<Movie>(function (resolve, reject) { resolve(movie) });

            spyOn(proxyService, "getMovieById").and.returnValue(getTopMoviesPromise);
        });

        it("should initialize proxyService correctly", () => {
            expect(proxyService).toBeDefined();
        });

        it('should call getTopMovies on initialization', () => {
            component.getMovieDetails();

            expect(proxyService.getMovieById).toHaveBeenCalled();
        });

        it('should call getTopMovies on calling onInit function', () => {
            component.onInit();

            expect(proxyService.getMovieById).toHaveBeenCalled();
        });

        it('should call getTopMovies on calling onChange function', () => {
            component.onChange();

            expect(proxyService.getMovieById).toHaveBeenCalled();
        });

    });
}