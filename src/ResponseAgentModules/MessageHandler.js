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

            // To check if the message was sent from a content script check for the existance of sender.tab
            if(!sender.tab)
            {
                this.handleIncomingMessage(request)
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
    handleIncomingMessage(objIncomingMessage)
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
                this.handleIncomingAction;
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
    handleIncomingAction()
    {
        throw new Error("TODO implement");
    }
}

export default MessageHandler;
