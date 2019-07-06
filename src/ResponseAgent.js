"use strict"

// Content scripts do not support ES imports TODO find workaround
import MessageHandler from "./ResponseAgentModules/MessageHandler.js";
import BdayNotificationHandler from "./ResponseAgentModules/BdayNotificationsHandler.js";

class ResponseAgent
{
	constructor()
	{
		this._incomingMessageHandler = null;
		this._bdayNotificationHandler = null;
		this._bRunning = false;
		
		this.objResponsesConfig = null;
	}

	init()
	{
		this._setup()
	}

	async runResponseProcess()
	{
		if(this._bRunning)
		{
			console.log("Agent is allready running");
			return;
		}

		this._bRunning = true;
		
		if(this._bdayNotificationHandler === null)
		{
			this._bdayNotificationHandler = new BdayNotificationHandler();
		}
		
		// Always make sure we use the latest responses config
		this.objResponsesConfig = await this._retrieveProcessConfig();
		this._bdayNotificationHandler.objResponsesConfig = this.objResponsesConfig;
		this._bdayNotificationHandler.registerNotificationEvents();
	}

	stopResponseProcess()
	{
		if(this._bRunning === false)
		{
			console.log("Agent must be running to be stoped.");
		}

		this._bRunning = false;
		this._bdayNotificationHandler.stopNotificationEvents();
	}

	/**
	 * Updates the information from the notification handler using the information from the storage
	 */
	async reloadProcessConfig()
	{
		// If is running just restart it
		if(this._bRunning)
		{
			this.stopResponseProcess();
			await this.runResponseProcess();
			return;
		}

		this.objResponsesConfig = await this._retrieveProcessConfig();
	}

	_retrieveProcessConfig()
	{
		return new Promise((resolve, reject) => {
			try
			{
				chrome.storage.sync.get(["birthday", "responses", "exceptions", "stopped"], (objData) => 
				{
					resolve(objData);
				});
			}
			catch(error)
			{
				reject(error)
			}
		});
	}

	_setup()
	{
		this._incomingMessageHandler = new MessageHandler(this);
		this._incomingMessageHandler.listenForIncomingMessages();
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