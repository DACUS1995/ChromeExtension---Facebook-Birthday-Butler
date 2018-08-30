import {config} from "../config.js";

class MessageHandler
{
	/**
	 * @param {ResponseAgent} agentInstance
	 */
	constructor(agentInstance)
	{
		this._agent = agentInstance;
	}

	listenForIncomingMessages()
	{
		chrome.runtime.onMessage.addListener(function(request, sender, response){

			// Check if the message was sent from a content script check for the existance of sender.tab
			if(!sender.tab)
			{
				this.handleIncomingMessage(request).catch(error => console.log(error));
				response({message: "received"});
			}
		}); 
	}

	/**
	 * All incoming messages must go through this function and then dispatched to the
	 * right handler
	 * 
	 * @param {Object} objIncomingMessage 
	 */
	async handleIncomingMessage(objIncomingMessage)
	{
		if(!(objIncomingMessage.type in Object.values(config.commndTypes)))
		{
			throw new Error(`Invalid message type: ${objIncomingMessage.type}`);
		}

		if(!(objIncomingMessage.message in Object.values(config.commands)))
		{
			throw new Error(`Invalid command: ${objIncomingMessage.message}`);
		}

		switch(objIncomingMessage.type)
		{
			case config.commndTypes.NOTIFICATION:
				this.handleIncomingNotification(objIncomingMessage);
				break;

			case config.commandTypes.ACTION:
				await this.handleIncomingAction(objIncomingMessage);
				break;
			default:
				throw new Error("Unhandled message types.");
				
		}
	}

	/**
	 * @param {Object} objIncomingMessage
	 */
	handleIncomingNotification(objIncomingMessage)
	{
		console.log(objIncomingMessage.message);
	}

	/**
	 * @param {Object} objIncomingMessage
	 */
	async handleIncomingAction(objIncomingMessage)
	{
		switch(objIncomingMessage.message)
		{
			case config.commands.ACTIVATE:
				await this._agent.runResponseProcess();
				break;
			case config.commands.STOP:
				this._agent.stopResponseProcess();
				break;
			case config.commands.RELOAD_CONFIG:
				await this._agent.reloadProcessConfig();
				break;
			default:
				throw new Error("Unhandled command type");
		}
	}
}

export default MessageHandler;
