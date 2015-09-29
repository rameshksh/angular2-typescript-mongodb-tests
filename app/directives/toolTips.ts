/// <reference path='../../typings/tsd.d.ts' />

import {Directive, View} from 'angular2/angular2';

@Directive({
    selector: '[tooltip]',
    properties: [
        'text: tooltip'
    ],
    hostListeners: {
        'onmouseenter': 'onMouseEnter()',
        'onmouseleave': 'onMouseLeave()'
    }
})

class Tooltip
{
    text: string;    
     
    constructor()
    {
       
    }

    onMouseEnter()
    {
        // exact signature to be determined       
    }

    onMouseLeave()
    {
                
    }
}