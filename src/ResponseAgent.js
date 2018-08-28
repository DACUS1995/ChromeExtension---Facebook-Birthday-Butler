"use strict"

import MessageHandler from "./ResponseAgentModules/MessageHandler.js"

class ResponseAgent
{
    constructor()
    {
        this._incomingMessageHandler = null;
    }

    init()
    {
        this._setup()
    }

    _setup()
    {
        this._incomingMessageHandler = new MessageHandler(this);
    }
}

(new ResponseAgent).init();

// // Listen for runtime messages
// chrome.runtime.onMessage.addListener(function(request, sender, response){
//     // To check if the message was sent from a content script check for the existance of sender.tab
//     if(!sender.tab)
//     {
//         console.log(request.message);
//         response({message: "received"});
//     }
// });

// //Send message to extension runtime environment
// chrome.runtime.sendMessage({message: "hello"}, function(response) {
//     console.log(response.message);
// });