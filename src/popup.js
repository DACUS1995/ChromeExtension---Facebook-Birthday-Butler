'use strict';

import BirthdaySelect from "./Components/BirthdaySelect.js";
import Responses from "./Components/Responses.js";
import ResponseExceptions from "./Components/ResponseExceptions.js";

import * as config from "./config.js";

class Main
{
	constructor()
	{
		this.logInit()
	}

	async init()
	{
		await this.syncronizeStorageVariables();
		this.renderComponents();
		this.addEvents();
		this.loadContentScript()
	}


	syncronizeStorageVariables()
	{
		return new Promise((resolve, reject) => {
			chrome.storage.sync.get(["birthday", "responses", "exceptions", "stoped"], function(objData) 
			{
				try
				{
					BirthdaySelect.instance().setRenderingValues(objData);
					Responses.instance().setRenderingValues(objData);
					ResponseExceptions.instance().setRenderingValues(objData);
	
					resolve();
				}
				catch(error)
				{
					reject(error)
				}
			});
		});
	}


	renderComponents()
	{
		BirthdaySelect.instance(document.getElementById("birthday-selector")).render();
		Responses.instance(document.getElementById("response-pool")).render();
		ResponseExceptions.instance(document.getElementById("exceptions")).render();	
	}


	addEvents()
	{
		// Save buton event
		const elSaveButton = document.getElementById("save-button");
		elSaveButton.addEventListener("click", event => {
			const strPickedDate = BirthdaySelect.instance().datePicker.toString();
			const arrResponses = Array.from(document.getElementsByClassName("responses")).map(el => el.value);

			this.saveToStorage({
				birthday: strPickedDate,
				responses: arrResponses,
				exceptions: [],
				status: "stoped"
			});
		});

		// Activate button event
		const elActivateButton = document.getElementById("activate-button");
		elActivateButton.addEventListener("click", event => {
			this.activate();
		});

		// Listen for runtime messages
		chrome.runtime.onMessage.addListener(function(request, sender, response){
			// To check if the message was sent from a content script check for the existance of sender.tab
			if(sender.tab)
			{
				console.log(request.message);
				response({message: "received"});
			}
		});
	}


	/**
	 * @param {Object} objConfig 
	 */
	saveToStorage(objConfig)
	{
		console.log(JSON.stringify(objConfig));

		chrome.storage.sync.set(objConfig, function() {
			console.log("Info updated");
		});
	}


	/**
	 * Activate the facebook automatic response functionality
	 */
	activate()
	{
		console.log("Activated");

		this.sendContentScriptMessage(
			config.commandTypes.ACTION, 
			config.commands.ACTIVATE
		);
	}


	/**
	 * Stop the facebook automatic response functionality
	 */
	stop()
	{
		console.log("Stoped");

		this.sendContentScriptMessage(
			config.commandTypes.ACTION, 
			config.commands.STOP
		);
	}


	loadContentScript()
	{
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.executeScript({
				file: config.CONTENT_SCRIPT_FILE_PATH // Resolved relative to the Extension base URL :( )
			});
		});
	}


	sendContentScriptMessage(strMessageType, strSerializedContent)
	{
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(
				tabs[0].id, 
				{
					message: strSerializedContent,
					type: strMessageType
				}, 
				function(response) {
					console.log(response.message);
				}
			);
		});	
	}


	logInit()
	{
		console.log("Main");
	}
}

(new Main())
	.init()
	.catch(error => {
		console.error(error);
	});
