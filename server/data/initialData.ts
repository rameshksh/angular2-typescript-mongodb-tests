/// <reference path='../../typings/tsd.d.ts' />

import {Express, Request, Response} from "express";
import logger = require('winston');
import {Db} from 'mongodb';
import {Repository} from '../repository/movie';
import {Services} from '../services/movie';
import {Movie} from '../models/movie';
import {Review} from '../models/review';

var self;

export class InitialData
{
    service: Services.MovieService;
    sampleData: Array<Movie>;
    db: Db;


    constructor(db: Db)
    {
        self = this;
        var repository = new Repository.MovieRepository(db)
        this.service = new Services.MovieService(repository);
    }

    verifyData()
    {
        logger.log('debug', 'verifying movies from database..');
        var sampleData = this.getSampleData();

        this.service.getAll(null,null,function (err, items)
        { 
            if (items && (items.length > 0))
            {
                logger.log('debug', 'Initial data - Movies OK');
            } else
            {
                
                self.service.initData(sampleData, function (err, result)
                {
                    if (!err)
                    {
                        logger.log('debug', 'Initial data - Movies Inserting..');
                    } else
                    {
                        logger.log('debug', err.toString());
                    }
                });
            }
        });
    }

    getSampleData(): Array<Movie>
    {
        var list = new Array<Movie>();
        
        var newMovie = new Movie();
        var review = new Review();

        newMovie.Id = 1;
        newMovie.Name = "Avtar";
        newMovie.Description = "Awesome Movie";
        newMovie.Genre = "Horror";
        newMovie.Rating = 5;
        newMovie.Year = "12/2/2005";
        newMovie.Collection = 100;
        newMovie.Language = "English";
               
        review.Title = "Good Movie";
        review.Description = "Must watch movie";
        review.ReviewDate = "12/2/2015";

        newMovie.Reviews = new Array<Review>();
        newMovie.Reviews.push(review);

        list.push(newMovie);        

        newMovie = new Movie();
        review = new Review();

        newMovie.Id = 2;
        newMovie.Name = "Avtar";
        newMovie.Description = "Awesome Movie";
        newMovie.Genre = "Horror";
        newMovie.Rating = 5;
        newMovie.Year = "12/2/2005";
        newMovie.Collection = 100;
        newMovie.Language = "English";        
        review.Title = "Good Movie";
        review.Description = "Must watch movie";
        review.ReviewDate = "12/2/2015";

        newMovie.Reviews = new Array<Review>();
        newMovie.Reviews.push(review);

        list.push(newMovie);       

        newMovie = new Movie();
        review = new Review();

        newMovie.Id = 3;
        newMovie.Name = "Avtar";
        newMovie.Description = "Awesome Movie";
        newMovie.Genre = "Horror";
        newMovie.Rating = 5;
        newMovie.Year = "12/2/2005";
        newMovie.Collection = 100;
        newMovie.Language = "English";
               
        review.Title = "Good Movie";
        review.Description = "Must watch movie";
        review.ReviewDate = "12/2/2015";

        newMovie.Reviews = new Array<Review>();
        newMovie.Reviews.push(review);

        list.push(newMovie);

        newMovie = new Movie();
        review = new Review();

        newMovie.Id = 4;
        newMovie.Name = "Avtar";
        newMovie.Description = "Awesome Movie";
        newMovie.Genre = "Horror";
        newMovie.Rating = 5;
        newMovie.Year = "12/2/2005";
        newMovie.Collection = 100;
        newMovie.Language = "English";
        
        review.Title = "Good Movie";
        review.Description = "Must watch movie";
        review.ReviewDate = "12/2/2015";

        newMovie.Reviews = new Array<Review>();
        newMovie.Reviews.push(review);

        list.push(newMovie);       

        newMovie = new Movie();
        review = new Review();

        newMovie.Id = 5;
        newMovie.Name = "Avtar";
        newMovie.Description = "Awesome Movie";
        newMovie.Genre = "Horror";
        newMovie.Rating = 5;
        newMovie.Year = "12/2/2005";
        newMovie.Collection = 100;
        newMovie.Language = "English";        
        review.Title = "Good Movie";
        review.Description = "Must watch movie";
        review.ReviewDate = "12/2/2015";

        newMovie.Reviews = new Array<Review>();

        newMovie.Reviews.push(review);

        list.push(newMovie);

        return list;
    }

} 