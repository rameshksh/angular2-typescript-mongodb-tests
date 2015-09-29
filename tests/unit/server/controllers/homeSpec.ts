/// <reference path='../../../../typings/tsd.d.ts' />

import {Injector, MockBackend, Http, BaseRequestOptions, bind} from 'angular2/angular2';
import {AppRootUrl} from 'angular2/angular2';

import {Review} from '../../../../app/models/review';
import {Movie} from '../../../../app/models/movie';
import {HomeController} from  '../../../../server/controllers/home';
import {Services} from '../../../../server/services/movie';

export function main() {
    describe('Home Controller', () => {
        var controller: HomeController,
            movieList: Array<Movie>,
            movieService: Services.MovieService;

        var getByQueryPromise: Promise<Array<Movie>>;

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
            
            movieService = new Services.MovieService(null);

            controller = new HomeController(movieService);

            var http = new Http();

            getByQueryPromise = new Promise<Array<Movie>>(function (resolve, reject) { resolve(movieList) });

            spyOn(movieService, "getByQuery").and.returnValue(getByQueryPromise);
        });

        it("should initialize movieService correctly", () => {
            expect(movieService).toBeDefined();
        });

        it('should call getByQuery on getTopMovies', () => {
            controller.getTopMovies(null, null);

            expect(movieService.getByQuery).toHaveBeenCalled();
        });
    });
}