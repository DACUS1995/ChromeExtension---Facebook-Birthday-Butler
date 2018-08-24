"use strict"

console.log("Hello");

// Listen for runtime messages
chrome.runtime.onMessage.addListener(function(request, sender, response){
    // To check if the message was sent from a content script check for the existance of sender.tab
    if(!sender.tab)
    {
        console.log(request.message);
        response({message: "received"});
    }
});

//Send message to extension runtime environment
chrome.runtime.sendMessage({message: "hello"}, function(response) {
    console.log(response.message);
});