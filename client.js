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
		var config = {};

		if (url.includes("https://meet.google.com/")){
			config.voice = ".IisKdb.iKxd7c.KaYEA";
			config.name = ".MyoDDb";
			config.speak = ".HX2H7";
		}

		return config
	}

	function init(config) {
		console.log(config);
		// start watching for people speaking

	    // fires when somebody speaks
	    sentinel.on(config.speak, function(el){
			console.log("speaking")
			console.log(el)
			console.log($(config.name))
		});

		// fires when people enter
		sentinel.on(config.name, function(el){
			console.log("Person entered")
			console.log(el)
			console.log($(config.name))
		});
	    
	    // TODO inject window
	    // TODO write events to window
	    // TODO get audio stream
	    // TODO transcribe audio stream
	}

	init(getVendorConfig(window.location.href));

} ());


/*
var port = chrome.runtime.connect({name: "storeDraft"});
port.postMessage({draftId:draftId,groupId:groupId});
port.onMessage.addListener(function(response) {
*/




