'use strict';

// const HOSTNAME_TARAGET = 'developer.chrome.com'
const HOSTNAME_TARAGET = 'www2.gogoanime.in';


chrome.runtime.onInstalled.addListener(function() 
{
	console.log("The Buttler is on duty!");

	chrome.storage.sync.set({birthday: ''}, function() {
		console.log("Birthday is set.");
	});

	const declarativeContentRule = 
	{
		conditions: [new chrome.declarativeContent.PageStateMatcher({
			pageUrl: {hostEquals: HOSTNAME_TARAGET},
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
	chrome.browserAction.setBadgeText({text: ""});
})
