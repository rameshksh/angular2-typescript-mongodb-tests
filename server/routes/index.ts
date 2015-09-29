/// <reference path='../../typings/tsd.d.ts' />

import {Express, Router, Request, Response} from 'express';
import logger = require('winston');

export class IndexRoute
{   
    app: any;

    constructor(app)
    {   
        this.app = app;
    }

   public getBase()
    {
       this.app.get('/', function (req, res)
       {
           return res.render('index.html');
       });
    }

   public getHome() {
       this.app.get('/home', function (req, res) {
           return res.render('index.html');
       });
   }

   public getMovies()
   {
       this.app.get('/movies', function (req, res)
       {
           return res.render('index.html');
       });
   }

   public getMoviesDetails() {
       this.app.get('/movies/details/:id', function (req, res) {
           return res.render('index.html');
       });
   }
}

