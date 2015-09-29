/// <reference path='../typings/tsd.d.ts' />
var Base = (function () {
    function Base(tabName) {
        this.activeHomeTab = '';
        this.activeAboutTab = '';
        this.activeMovieTab = '';
        debugger;
        switch (tabName) {
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
    return Base;
})();
exports.Base = Base;
//# sourceMappingURL=base.js.map