/// <reference path='../../typings/tsd.d.ts' />

import {Express, Request, Response} from "express";
import {Services} from 'services/movie';
import logger = require('winston');
import {Movie} from '../models/Movie';

var self;

export module Controllers {

    export interface IMoviesController {
        createMovie();
        getMovies(req: Request, res: Response);
        getMovieDetails();
        updateMovie();
        updateMovie();
        deleteMovie();
    }


    export class MoviesController //implements IMoviesController
    {
        private movies: Array<Movie>;
        private movieService: Services.MovieService;       

        constructor(service: Services.MovieService) {
            self = this;
            this.movieService = service;
        }

        public createMovie() {
            //return (this.movieService.create());
        }

        public getMovies(req: Request, res: Response) {

            var sortKey = req.query.sortKey;
            var sortOrder = req.query.sortOrder;

            self.movieService.getAll(sortKey, sortOrder, function (err, item)
            {
                if(err) console.log(err);

                return res.json(item);
            });
        }        

        public getTopMovies(req: Request, res: Response) {

            var query = { rating: { $gt: 4 } }

            self.movieService.getByQuery(query, null, null, function (err, item) {
                if (err) console.log(err);

                return res.json(item);
            });
        }

        public getMovieDetails(req: Request, res: Response) {
            var id = req.params.id;           
            
            self.movieService.getById(id, function (err, item) {
                if (err) console.log(err);

                return res.json(item);
            });
        }

        public updateMovie() {
            var id = "";
            return this.movieService.update(id);
        }

        public deleteMovie() {
            var id = "";
            return this.movieService.delete(id);
        }
    }
}
