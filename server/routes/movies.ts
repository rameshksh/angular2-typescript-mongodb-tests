/// <reference path='../../typings/tsd.d.ts' />

import {Express, Router, Request, Response} from 'express';
import {Db} from 'mongodb';
import {Services} from '../services/movie';
import {Repository} from '../repository/movie';
import {Controllers} from '../controllers/movie';
import logger = require('winston');

export class MoviesRoute
{
    moviesController: Controllers.MoviesController;  
    service: Services.MovieService;  
    app: Express;
    db: Db;

    constructor(app: Express, db: Db)
    {
        this.app = app;
        this.db = db;

        var repository = new Repository.MovieRepository(this.db)
        this.service = new Services.MovieService(repository);
        this.moviesController = new Controllers.MoviesController(this.service);
    }

    getRoutes()
    {   
        this.app.get('/api/movies/getall', this.moviesController.getMovies);
        this.app.get('/api/movies/gettop', this.moviesController.getTopMovies);
        this.app.get('/api/movies/get/:id', this.moviesController.getMovieDetails)
    }
}