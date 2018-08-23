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
		this.addSaveEvents();
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

	addSaveEvents()
	{
		const elSaveButton = document.getElementById("save-button");
		elSaveButton.addEventListener("click", event => {
			const dataPicked = BirthdaySelect.instance().datePicker;

			this.saveToStorage({
				date: dataPicked.toString(),
				responses: [],
				exceptions: []
			});
		});
	}

	saveToStorage(objConfig)
	{
		console.log(JSON.stringify(objConfig));

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
