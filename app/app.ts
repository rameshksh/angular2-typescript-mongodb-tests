/// <reference path='../typings/tsd.d.ts' />

import {Component, View, bootstrap} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, routerInjectables, Router, RootRouter, Pipeline, Location} from 'angular2/router';
import {httpInjectables} from 'angular2/angular2';
import {OnInit, OnChange, NgFor, NgIf, Http, bind, CSSClass} from 'angular2/angular2';

import {Base} from './base';
import {Home} from './components/home/index';
import {About} from './components/about/index';
import {MovieIndex} from './components/movie/index';
import {MovieDetails} from './components/movie/details';

import {ProxyService} from './services/proxyService';

@Component({
    selector: 'app'
})

@RouteConfig([
  { path: '/', component: Home, as: 'start' },
  { path: '/home', component: Home, as: 'home' },
  { path: '/about', component: About, as: 'about' },
  { path: '/movies/details/:id', component: MovieDetails, as: 'details' },
  { path: '/movies', component: MovieIndex, as: 'movies' }
])

@View({
  templateUrl: './app.html?v=<%= VERSION %>',
  directives: [CSSClass, RouterOutlet, RouterLink]
})

class App //extends Base
{
     activeHomeTab: string;
     activeAboutTab: string;
     activeMoviesTab: string;

     constructor()
     {
         // Here we configure, for each route, which component should be added and its alias for URL linking
         //router
         //    .config('/', Home, 'home')
         //    .then((_) => router.config('/login', Login, 'login'))
         //    .then((_) => router.config('/login', Login, 'login'))
         //    .then((_) => router.navigate('/'))
     }  

    onInit()
    {
        this.activeHomeTab = 'active';
        this.activeAboutTab = 'inactive';
        this.activeMoviesTab = 'inactive'; 
    }

    setActiveTab(tabName: string)
    {
        this.activeHomeTab = 'inactive';
        this.activeAboutTab = 'inactive';
        this.activeMoviesTab = 'inactive';       

        switch (tabName)
        {
            case "home":
                this.activeHomeTab = 'active';
                break;
            case "about":
                this.activeAboutTab = 'active';
                break;
            case "movies":
                this.activeMoviesTab = 'active';
                break;
            default:
                this.activeHomeTab = 'active';
                break;
        }
    }
}

export const moviesInjectables = [   
    bind(ProxyService).toClass(ProxyService),
    // We only have this to mimic Angular 1's di that is limited only to string tokens. Otherwise we would use `ProxyService` class as the token
    //bind(Router).toValue(new RootRouter()),
    bind('ProxyService').toAlias(ProxyService)
];



bootstrap(App, [routerInjectables, httpInjectables, moviesInjectables]);
