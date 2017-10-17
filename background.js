/* jslint devel: true, browser: true, indent: 4, evil: true */
/* global chrome, $, gapi, B64 */

(function() {
    "use strict";

    console.log("Hello World!");
    /*
    function dummy(request, port){
        port.postMessage(resp)
    }*/

    // Add listeners for communication from client
    chrome.runtime.onConnect.addListener(function(port) {
        /*
        if (port.name === "dummy") {
            port.onMessage.addListener(dummy)
        }
        */
    });

}());
