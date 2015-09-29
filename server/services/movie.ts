/// <reference path='../../typings/tsd.d.ts' />

import {Movie} from '../models/movie';
import {Repository} from '../repository/movie';
import logger = require('winston');
import {EntityService} from '../services/base';

export module Services
{
    export interface IMovieService {

    }
    export class MovieService extends EntityService<Movie> implements IMovieService
    {
        repository: Repository.MovieRepository;

        public constructor(repository: Repository.MovieRepository)
        {
            super(repository);
        }
    }
}


 