'use strict';

import {BirthdaySelect} from "./Components/BirthdaySelect.js";
import {Responses} from "./Components/Responses.js";
import {ResponseExceptions} from "./Components/ResponseExceptions.js";


class Main
{
	constructor()
	{
		this.logInit()
	}

	init()
	{
		this.initializeStorageVariables();
		this.renderComponents();
		this.addEvents();
	}


	initializeStorageVariables()
	{
		chrome.storage.sync.get('birthday', function(data) 
		{
			const birthday = data.birthday;
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
				exceptions: []
			});
		});

		// Activate button event
		const elActivateButton = document.getElementById("activate-button");
		elActivateButton.addEventListener("click", event => {
			this.activate();
		});
	}


	/**
	 * @param {Object} objConfig 
	 */
	saveToStorage(objConfig)
	{
		console.log(JSON.stringify(objConfig));

		chrome.storage.sync.set({info: objConfig}, function() {
			console.log("Info updated");
		});
	}


	/**
	 * Activate the facebook automatic response function
	 */
	activate()
	{
		console.log("Activated...");

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.executeScript({
				file: 'src/contentScript.js' // Resolved relative to the Extension base URL :( )
			});
		});
	}


	logInit()
	{
		console.log("Main");
	}
}

(new Main()).init();
