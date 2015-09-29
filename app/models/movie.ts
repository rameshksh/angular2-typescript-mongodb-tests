/// <reference path='../../typings/tsd.d.ts' />

import {Review} from '../../app/models/review';

export class Movie
{
    public Id: number;
    public Name: string;
    public Description: string;
    public Collection: number;
    public Genre: string;
    public Language: string;   
    public Year: string;
    public Rating: number;

    public Reviews: Array<Review>;
} 