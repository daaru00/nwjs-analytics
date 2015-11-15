
var analyticts = {
    apiVersion: '1',
    trackID: 'UA-XXXXXX-X', //tracking id
    clientID: null,
	appName: 'application',  //application name
	appVersion: '1.0.0',  //application version   
	debug: false,    
	performanceTracking: true,    
    sendRequest: function(data, callback){       
        if(!this.clientID)
            this.clientID = this.generateClientID();

        var postData = "v="+this.apiVersion+"&tid="+this.trackID+"&cid="+this.clientID+"&an="+this.appName+"&av="+this.appVersion;

        Object.keys(data).forEach(function(key) {
            var val = data[key];
            if(typeof val != "undefined")
                postData += "&"+key+"="+val;
        });

        var http = new XMLHttpRequest();
        var url = "https://www.google-analytics.com";
        if(!this.debug)
            url += "/collect";
        else
            url += "/debug/collect";

        http.open("POST", url, true);

        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                if(callback)
                    callback(true);
            }
            else
            {
                if(callback)
                    callback(false);
            }
        }
        http.send(postData);
    },
    generateClientID: function()
    {
        var id = "";
        var possibilities = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 5; i++ )
            id += possibilities.charAt(Math.floor(Math.random() * possibilities.length));
        return id;
    },    
    
    /*
     * Measurement Protocol 
     * [https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide]
     */
    
    screenView: function(screename){
        var data = {
			't' : 'screenview',
			'cd' : screename
		}
		this.sendRequest(data);
    },
    event: function(category, action, label, value){
        var data = {
			't' : 'event',
			'ec' : category,
			'ea' : action,
			'el' : label,
			'ev' : value,
		}		
		this.sendRequest(data);
    },
    exception: function(msg, fatal){
        var data = {
			't' : 'exception',
			'exd' : msg,
			'exf' : fatal || 0
		}		
		this.sendRequest(data);
    },
    timing: function(category, variable, time, label){
    
        var data = {
			't' : 'timing',
			'utc' : category,
			'utv' : variable,
			'utt' : time,
			'utl' : label,
		}		
		this.sendRequest(data);
    },
    custom: function(data){
        this.sendRequest(data);
    }
}

/*
 * Performance Tracking
 */

window.addEventListener("load", function() {
    
    if(analyticts.performanceTracking)
    {
        setTimeout(function() {
            var timing = window.performance.timing;
            var userTime = timing.loadEventEnd - timing.navigationStart;
            
            analyticts.timing("performance", "pageload", userTime);
            
          }, 0);  
    }

}, false);

