/// <reference path='../../../typings/tsd.d.ts' />

import {Component, View} from 'angular2/angular2';
import {Base} from '../../base';

@Component({
    selector: 'component-2'
})
@View({
    templateUrl: './components/about/about.html?v=<%= VERSION %>'
})

export class About //extends Base
{
    constructor()
    {
        //super('aboutUs');
    }
    
}
