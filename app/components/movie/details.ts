/// <reference path='../../../typings/tsd.d.ts' />

import {Component, View} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';
import {OnInit, OnChange, NgFor, NgIf} from 'angular2/angular2';

import {ProxyService} from '../../services/proxyService';
import {Base} from '../../base';
import {Movie} from '../../models/movie';

@Component({
    selector: 'component-1'
})

@View({
    templateUrl: './components/movie/details.html?v=<%= VERSION %>',
    directives: [RouterLink, NgFor, NgIf]
})

export class MovieDetails //extends Base
{
    private proxyService: ProxyService;
    private movie: Movie;

    constructor(proxyService: ProxyService)
    {  
        //super('movies');
        this.proxyService = proxyService; 
        this.movie = new Movie();     
    }

    getMovieDetails()
    {
        var id = "12";

        this.proxyService.getMovieById(id).then((response) =>
        {           
            this.movie = response;
        });

        //this.proxyService.getMovies()
        //    .map(r => r.json())
        //    .subscribe(a => {
        //    this.movies = a;
        //});
    }

    onInit()
    {
        this.getMovieDetails();
    }

    onChange()
    {
        this.getMovieDetails();
    }
}