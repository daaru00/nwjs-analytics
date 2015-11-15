# nwjs-analytics
Node-Webkit Google Analytics integration

Simple integration of Google Analytics Application (named Analytics for Mobile Apps) into  Node-Webkit application

### Installation

include **analytics.js** in your index.html file

```html
<script src="analytics.js"></script>
```

### Setup

Set your **tracking ID**, **application name** and **application version** in ```analytics.js``` file

```javascript
var analyticts = {
    trackID: 'UA-XXXXXX-X', //tracking id
    appName: 'application',  //application name
    appVersion: '1.0.0',
    ...
```

If you are using a User-ID traking set clientID
```javascript
var analyticts = {
    ...
    clientID: 'john-smith',
    ...
```
or at runtime process
```javascript
analyticts.clientID = 'john-smith';
```
otherwise will be generate a random client id

### Usage

#### Screen View

```javascript
analyticts.screenView('login');
```
#### Event

```javascript
analyticts.event('category', 'action', 'label', 'value');
```
#### Exception

```javascript
analyticts.event('NotFoundError', 0); //second parameters is fatal flag
```

### Timing

```javascript
var startTime = new Date().getTime();
...
var endTime = new Date().getTime();
var timeSpent = endTime - startTime;
analyticts.event('category', 'variable', timeSpent, 'label');
```

### Custom API

Check [Working with the Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide) page
```javascript
var data = {
    't' : 'event',
	'ec' : 'category',
	'ea' : 'action'
}
```

### Extra

#### Debug Mode
You can set ```debug``` property ```true``` in **analytics.js** file to check hit parsing
```javascript
var analyticts = {
    ...
	debug: true,   
	...
```
output example
```
{
  "hitParsingResult": [ {
    "valid": true,
    "parserMessage": [ ],
    "hit": "/debug/collect?v=1\u0026tid=UA-XXXXXX-X\u0026cid=M1RWD\u0026an=application\u0026av=1.0.0\u0026t=screenview\u0026cd=login"
  } ],
  "parserMessage": [ {
    "messageType": "INFO",
    "description": "Found 1 hit in the request."
  } ]
}
```
**Note**: data will be not collect in debug mode

#### Performance Tracking

You can set ```performanceTracking``` property ```true``` in **analytics.js** file to automatically send load page timing
```javascript
var analyticts = {
    ...
	performanceTracking: true,   
	...
```

#### AngularJS ui-router integration
```javascript
App.run(['$rootScope', function($rootScope,) {
    $rootScope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){
            analyticts.screenView(toState.name);
    })
}]);
```

### Useful Links

Google Analytics Collect API:
[Working with the Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide)

Hit builder and testing tool:
[Hit Builder](https://ga-dev-tools.appspot.com/hit-builder/)


License
----

MIT

