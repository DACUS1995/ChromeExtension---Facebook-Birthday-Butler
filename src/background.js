'use strict';

import * as config from "./config.js";

chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (let key in changes) 
	{
		let storageChange = changes[key];
		console.log(storageChange.newValue);
	}
  });


chrome.runtime.onInstalled.addListener(function() 
{
	console.log("The Buttler is on duty!");

	const objDefaultStorage = {
		birthday: null,
		responses: null,
		exceptions: null,
		stopped: null
	};

	chrome.storage.sync.set(objDefaultStorage, function() {
		console.log("Storage info reseted.");
	});

	const declarativeContentRule = 
	{
		conditions: [new chrome.declarativeContent.PageStateMatcher({
			pageUrl: {hostEquals: config.HOSTNAME_TARAGET},
		})],
		actions: [new chrome.declarativeContent.ShowPageAction()]
	};

	/**
	 * Define when the extension is usable.
	 * (Added rules are saved across browser restarts and thus when loading 
	 * the extension we need to remove them)
	 * 
	 * By using the page action API we can take action without automatically injecting content scripts
	 */
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() 
	{
		chrome.declarativeContent.onPageChanged.addRules([declarativeContentRule]);
	});
});

chrome.runtime.onSuspend.addListener(function() 
{
	console.log("Unloading.");
})
