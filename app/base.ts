/// <reference path='../typings/tsd.d.ts' />

export class Base
{
    public activeHomeTab: string;
    public activeAboutTab: string;
    public activeMovieTab: string;

    constructor(tabName : string)
    {
        this.activeHomeTab = '';
        this.activeAboutTab = '';
        this.activeMovieTab = '';
        debugger;

        switch (tabName)
        {
            case "home":
                this.activeHomeTab = 'active';
                break;
            case "aboutUs":
                this.activeAboutTab = 'active';
                break;
            case "movies":
                this.activeMovieTab = 'active';
                break;
            default:
                this.activeHomeTab = 'active';
                break;

        }
    }
}