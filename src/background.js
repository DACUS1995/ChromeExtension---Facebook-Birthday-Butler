'use strict';

chrome.runtime.onInstalled.addListener(function() {
	console.log("The Buttler is on duty!");

	chrome.storage.sync.set({color: '#3aa757'}, function() {
		console.log('The color is green.');
	});

	const declarativeContentRule = {
		conditions: [new chrome.declarativeContent.PageStateMatcher({
			pageUrl: {hostEquals: "*.gogoanime.in/*"},
		})],
		actions: [new chrome.declarativeContent.ShowPageAction()]
	};

	/**
	 * Define when the extension is usable.
	 * (Added rules are saved across browser restarts and when loading 
	 * the extension we need to remove them)
	 * 
	 * By using the page action API we can take action without inject content scripts
	 */
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([declarativeContentRule]);
	});
});

chrome.runtime.onSuspend.addListener(function() {
	console.log("Unloading.");
	chrome.browserAction.setBadgeText({text: ""});
})
