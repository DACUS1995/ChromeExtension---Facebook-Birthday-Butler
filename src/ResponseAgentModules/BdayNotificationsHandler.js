"use strict"

import * as config from "../config.js";

class BdayNotificationHandler
{
	/**
	 * @param {Object} [objResponsesConfig = null]
	 */
	constructor(objResponsesConfig = null)
	{
		this.objResponsesConfig = objResponsesConfig;
		
		this._elNotificationNotifier = null;
		this._arrBirthdayWishesToBeProcessed = [];
		this._observer = null;

		this._elNotificationButton = document.getElementsByClassName("_2n_9")[2];

		this._nLastCalled = null;
	}

	registerNotificationEvents()
	{
		console.log("Notification events registered");

		if(this._observer === null)
		{
			this._createObserver();
		}

		this._observer.observe(this._elNotificationButton, 
			/*config*/{
				attributes: true,
				childList: true,
				subtree: true
			})
	}

	stopNotificationEvents()
	{
		if(this._observer === null)
		{
			return;
		}

		console.log("Notification events stoped");
		this._observer.disconnect();
	}

	_createObserver()
	{
		this._observer = new MutationObserver((arrMutationList) => {
			// First the observer must be disabled to make sure we dont generate new events
			this.stopNotificationEvents();	
					
			// Make sure this function is not called in fast sequence
			if(this._nLastCalled !== null)
			{
				const nCurrentTime = Date.now();

				if(nCurrentTime - this._nLastCalled < 1000)
				{
					return;
				}
			}



			console.log(arrMutationList);
			this._elNotificationButton.click();

			const elNotificationPanel = document.getElementById("fbNotificationsFlyout");
			const arrNotifcationList = elNotificationPanel.getElementsByClassName("_32hm")[0].getElementsByTagName("li");

			console.log("Lists");
			console.log(arrNotifcationList);

			this.registerNotificationEvents();

			this._nLastCalled = Date.now();	
		});
	}
}

export default BdayNotificationHandler;
