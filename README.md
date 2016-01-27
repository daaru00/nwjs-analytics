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
var analytics = {
    trackID: 'UA-XXXXXX-X', //tracking id
    appName: 'appname',  //application name
    appVersion: '1.0.0',
    ...
```

If you are using a User-ID traking set userID
```javascript
var analytics = {
    ...
    userID: 'john-smith',
    ...
```
or at runtime process
```javascript
analytics.userID = 'john-smith';
```
otherwise will be generate a random client id

If you want to change clientID you can use this:
```javascript
var analytics = {
    ...
    clientID: 'mac-01',
    ...
```
or at runtime process
```javascript
analytics.clientID = 'mac01';
```

### Usage

#### Screen View

```javascript
analytics.screenView('login');
```
#### Event

```javascript
analytics.event('category', 'action', 'label', 'value');
```
#### Exception

```javascript
analytics.event('NotFoundError', 0); //second parameters is fatal flag
```

### Timing

```javascript
var startTime = new Date().getTime();
...
var endTime = new Date().getTime();
var timeSpent = endTime - startTime;
analytics.event('category', 'variable', timeSpent, 'label');
```

### Ecommerce

Currency setup

```javascript
var analytics = {
    ...
    currency: "USD",
    ...
```
or at runtime process
```javascript
analytics.currency = "USD";
```

To send ecommerce data

```javascript
var order_id = "O145KL";
var total = 15.20;
var item = [
    {id: 40,name: "item1", price: 15.00, qty: 1},
    {id: 12,name: "item2", price: 0.20, qty: 1}
]
ecommerce.transactionID = "O145KL"; //optional, if is not set a random id will be generated
ecommerce.transaction(total, items)
```

### Custom API

Check [Working with the Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide) page
```javascript
var data = {
    't' : 'event',
	'ec' : 'category',
	'ea' : 'action'
}
analytics.custom(data);
```

### Extra

#### Debug Mode
You can set ```debug``` property ```true``` in **analytics.js** file to check hit parsing
```javascript
var analytics = {
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
var analytics = {
    ...
	performanceTracking: true,   
	...
```

#### AngularJS ui-router integration
```javascript
App.run(['$rootScope', function($rootScope,) {
    $rootScope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){
            analytics.screenView(toState.name);
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

