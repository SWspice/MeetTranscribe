/* jslint devel: true, browser: true, indent: 4, evil: true */
/* global chrome, $, gapi, B64 */

(function() {
    "use strict";


    function urlChange(request, port){

            port.postMessage(resp)

    }

    // Add listeners for communication from client
    chrome.runtime.onConnect.addListener(function(port) {
        if (port.name === "watchURLChange") {
            chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
                // alert client of urlChange
                port.postMessage("");
            });
        }
    });

}());
