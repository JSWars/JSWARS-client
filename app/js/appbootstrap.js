// The app/scripts/bootstrap.js file which tells AngularJS
// to go ahead and bootstrap when the DOM is loaded
define(['app', 'angular', 'domReady'], function (app, angular, domReady) {
	domReady(function () {
		angular.bootstrap(document, [app.name]);
	});
});
