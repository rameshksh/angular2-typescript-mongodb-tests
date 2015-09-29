/// <reference path='../../../typings/tsd.d.ts' />

import {Component, View, bootstrap} from 'angular2/angular2';
import {Router, RouterOutlet, RouterLink} from 'angular2/router';
import { FormBuilder, ControlGroup, NgModel, NgControl, formDirectives} from 'angular2/angular2';
import {OnInit, OnChange, NgFor, NgIf, Http, bind} from 'angular2/angular2';

import {httpInjectables, Validators, Injector} from 'angular2/angular2';
import {ProxyService} from '../../services/proxyService';
import {Movie} from '../../models/Movie';

import {Base} from '../../base';


@Component({
    selector: 'component-1'
})

@View({
    templateUrl: './components/home/index.html?v=<%= VERSION %>',
    directives: [RouterLink, formDirectives, NgFor, NgIf]
})

export class Home //extends Base 
{
    private proxyService: ProxyService;
    private movies: Array<Movie>;

    constructor(proxyService: ProxyService)
    {
        //, public router: Router
        //super('home');
        this.proxyService = proxyService;
        this.movies = new Array<Movie>();
    }

    getTopMovies() {
        this.proxyService.getTopMovies().then((response) => {
            this.movies = response;
        });

        //this.proxyService.getMovies()
        //    .map(r => r.json())
        //    .subscribe(a => {
        //    this.movies = a;
        //});
    }

    getDetails(event, id)
    {
       // this.router.parent.navigate('/movies/detail/' + id);
    }

    onInit() {
        this.getTopMovies();
    }

    onChange() {
        this.getTopMovies();
    }
}