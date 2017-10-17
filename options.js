/*global chrome, $, gapi, B64*/
//"key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkv7zUpvjurQGjSC9q9m+ml2bjoRlBal6xTeYSzWvCDfMBHxBP7oSInNlSeOdJkHgeCdB++xz2oT0mY0fAQhmbdV8cmDBL9l0IxAO0RRpQyBiV6yKHdRZ+3pvGD+ZAE9adTqj+WApYfmMh38rCS+rPQ5STfTAb1Gp9/Nvtyg9kYT4XOUVB78dio+xCAtxGAEVrGayzdlJACW4tPZSctmj4J5l8iTR+lKgUDhSlwPinK1NYj9GdZEYWxCKcv3pD9W/8DldTycFjvXP9DGonuDkT3uiQH0ztnzmatl24A5//KmFTHN07mzblK7OjvkCw0o6X7bSlNae5vzU+kX2Px8xLQIDAQAB"

// The Browser API key obtained from the Google Developers Console.
var developerKey = 'AIzaSyDvWdyejF1SDEszZaoTBRS0YIMUxtZE-bI';
// The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
var clientId = "164714988608-vlqpg1ve7m9q1eg34kct7kl4lbm4n3d7.apps.googleusercontent.com"

// Replace with your own App ID. (Its the first number in your Client ID)
var appId = "164714988608";

// Scope to use to access user's Drive items.
var scope = ['https://www.googleapis.com/auth/drive'];

var pickerApiLoaded = false;
var oauthToken;

// Use the Google API Loader script to load the google.picker script.
function loadPicker() {
	console.log("loadPicker");
	gapi.load('auth', {'callback': onAuthApiLoad});
	gapi.load('picker', {'callback': onPickerApiLoad});
}

function onAuthApiLoad() {
	console.log("onAuthApiLoad");
	window.gapi.auth.authorize(
	{
		'client_id': clientId,
		'scope': scope,
		'immediate': true
	},
	handleAuthResult);
}

function onPickerApiLoad() {
	console.log("onPickerApiLoad");
	pickerApiLoaded = true;
	createPicker();
}

function handleAuthResult(authResult) {
	console.log("handleAuthResult");
	if (authResult && !authResult.error) {
		oauthToken = authResult.access_token;
        createPicker();
	}
}

function createPicker() {
	console.log("createPicker");
	if (pickerApiLoaded && oauthToken) {
		var view = new google.picker.DocsView(google.picker.ViewId.FOLDERS);
		view.setSelectFolderEnabled(true);

		var picker = new google.picker.PickerBuilder().
		addView(view).
		setTitle("Bitte root Ordner von gTemplate und anschliessend Select klicken").
		setOAuthToken(oauthToken).
		setDeveloperKey(developerKey).
		setCallback(pickerCallback).
		build();
		picker.setVisible(true);
	}
}

// A simple callback implementation.
function pickerCallback(data) {
	var id = 'nothing';
	if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
		var doc = data[google.picker.Response.DOCUMENTS][0];
		id = doc[google.picker.Document.ID];
		var url = doc[google.picker.Document.URL];
		chrome.storage.local.set({
    			folderId: id,
  			}, function() {
				var message = "Ordner ausgewählt";
        		document.getElementById('result').innerHTML = message;
				chrome.tabs.getCurrent(function(tab) {
    					chrome.tabs.remove(tab.id, function() { });
				});

  		});
	}
	
}
