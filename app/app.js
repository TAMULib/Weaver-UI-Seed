import core from 'weaver-ui-core/app/core';
import 'angular-messages';
import 'angular-route';
import 'angular-sanitize';
import 'ng-table/bundles/ng-table';
import 'angular-ui-bootstrap';
import * as setup from 'weaver-ui-core/app/setup';
import './resources/styles/sass/app.scss';

var app = angular.module('app', [
  'ngRoute',
  'ngSanitize',
  'ngTable'
]);

app.model = core.model;
app.repo = core.repo;

var config = require('./config');
require('./controllers');
require('./model');
// require('./directives');
// require('./services');
require('./repo');

//This method's callback is passed to stomp and executed on both successfull connection, as well as disconnect.
setup.setUpApp(config.appConfig, function (connected) {
  //Indicates at app start if the app has successfully conenected to the service
  config.appConfig.connected = connected;

  app.constant('appConfig', config.appConfig);
  app.constant('api', config.apiMapping);
  angular.element(document).ready(function () {
    var doc = angular.element(document);
    var injector = doc.injector();

    try {
      //If the app is already bootstrapped then an error will be thrown
      angular.bootstrap(document, ['app', 'core', 'ngMessages', 'ui.bootstrap']);

      if (!window.stompClient.connected) {
        var AlertService = injector.get('AlertService');
        AlertService.add({
          type: "ERROR",
          message: "Web service cannot be reached."
        }, "/app/errors");
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      /*
        * If websockets dissconnect the app will attempt to re-bootstrap. Since the app is already running we will
        * end up in this block, and can generate an error indicating the disconnect.
        */
      // eslint-disable-next-line no-console
      console.log("Angular could not bootstrap");
      if (typeof injector != 'undefined') {
        AlertService = injector.get('AlertService');
        AlertService.add({
          type: "ERROR",
          message: "Web service cannot be reached."
        }, "/app/errors");
      } else {
        //foreward to error page
        // eslint-disable-next-line no-console
        console.log('forward to error page');
      }
    }
  });
});
