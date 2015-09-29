System.config({
    baseURL: '<%= APP_BASE %>',
    paths: { '*': '*.js?v=<%= VERSION %>' }
});
System.import('app')
    .catch(function (e) { return console.error(e); });
//# sourceMappingURL=init.ts.ktp.ts.ktp.js.map