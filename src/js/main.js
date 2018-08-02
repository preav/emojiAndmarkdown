// <<<<<<<<<<<<<<<< MARKDOWN >>>>>>>>>>>>>>>>>>
var markdown = require( "markdown" ).markdown;
//var webpagePreview = require("webpage-preview");

document.getElementById('send').addEventListener('click', enableMarkdown);

//use this for messages to support markdown. All messages must go through
//this function to support markdown
function enableMarkdown() {
	//enter the id of chat box for this to get its value
	var val = document.getElementById('inpText').value;
	//enter id of where you want the message to be displayed, when user hits enter.
	document.getElementById('mark').innerHTML += markdown.toHTML(val);
}
// <<<<<<<<<<<<< MARKDOWN ENDS >>>>>>>>>>>>>>>>>


// <<<<<<<<<< FOR DESKTOP NOTIFICATIONS >>>>>>>>>>>>>

// checks window state
var vis = (function(){
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
})();

var visible = vis(); // gives current state

// registers a handler for visibility changes
// enable web browser notifications as well when browser is active and
// if not, keep both, desk and web notification avtive, write that
// login instead of console statement
vis(function(){
	vis() ? console.log('visible') : DesktopNotification();
});

//0. give permission to browser to send notifications
function DesktopNotification() {
	console.log("permission")
	var currentWindow = window;
 	if(Notification && Notification.permission === 'default') {
   		Notification.requestPermission(function (permission) {
      		if(!('permission' in Notification)) {
        		Notification.permission = permission;
      		}
   		})
	}
	desktopNotification(currentWindow);
}

//1.check permission 
//we can request permission here again if its value is 'default' //using the previously discussed code
function desktopNotification(currentWindow) {
	console.log('desk not called')
    if (Notification.permission === "granted") {
    	console.log("granted")
      var text = "Message can be displayed here";
      sendDesktopNotification(text, currentWindow);
    }
    else {
    	console.log("not granted")
    }
}

//2. send Notification
function sendDesktopNotification(text, currentWindow) {
    let notification = new Notification('New Notification', {
    //icon: "user profile icon, fetch from DB",
	body: text,
	tag: "multiple notifications"
    });
    //’tag’ handles muti tab scenario i.e when multiple tabs are 
    // open then only one notification is sent

	//3. handle notification events and set timeout 
	notification.onclick = function() {
	    currentWindow.focus();
	};
    setTimeout(notification.close.bind(notification), 10000);
  }

// <<<<<<<<<<<<<<<<<< DESKTOP NOTIFICATION ENDS >>>>>>>>>>>>>>>>


// <<<<<<<<<<<<<< LIVE URL PREVIEW >>>>>>>>>>>>>>>>>>>

