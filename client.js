/* jslint devel: true, browser: true, indent: 4 */
/* global chrome, $ */

(function () {
	"use strict";

	function execBackend(name, func_arguments, callback) {
	    // port between front and backend
	    var port = chrome.runtime.connect({
	      name: name
	    });

	    // send arguments
	    port.postMessage(func_arguments);

	    // execute callback on response
	    port.onMessage.addListener(callback);
	}


	function getVendorConfig(url){
		// Google Meet
		var config = {
			"voiceSelector" : ""
			"nameSelector" : ""
		}

		if (url.includes("https://meet.google.com/")){
			config.voiceSelector = ".IisKdb.iKxd7c.KaYEA.gjg47c";
			config.nameSelector = ".MyoDDb";
		}

		return config
	}

	function init(config) {
		alert("Hello World");
	}

	init(getVendorConfig(window.location));

} ());


/*
var port = chrome.runtime.connect({name: "storeDraft"});
port.postMessage({draftId:draftId,groupId:groupId});
port.onMessage.addListener(function(response) {
*/




