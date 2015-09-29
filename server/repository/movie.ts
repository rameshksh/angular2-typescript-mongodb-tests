/// <reference path='../../typings/tsd.d.ts' />

import {Db, Collection} from 'mongodb';
import logger = require('winston');
import {BaseRepository, IBaseRepository} from '../repository/base';
import {Movie} from '../models/Movie';

export module Repository { 

    export class MovieRepository extends BaseRepository<Movie>
    {
        db: Db;
        constructor(database: Db) {
            super(database);
        }
    } 
}
