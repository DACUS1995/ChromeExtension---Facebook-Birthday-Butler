'use strict';

import {ComponentBase} from "./ComponentBase.js";

class Responses extends ComponentBase
{
	constructor(elDivContainer = null)
	{
		super(elDivContainer);
	}


    render()
    {
		const elButtonAddNewOption = document.createElement("button");
		elButtonAddNewOption.className = "btn btn-outline-secondary btn-sm";
		elButtonAddNewOption.id = "add-reponse-button";
		elButtonAddNewOption.style = "margin: auto;";
		elButtonAddNewOption.innerText = "Add new response";
		this._elDivContainer.appendChild(elButtonAddNewOption);

		if(Array.isArray(this._responses) && this._responses.length != 0)
		{
			this._responses.forEach((value, index) => 
			{
				this.addNewResponseField(elButtonAddNewOption, value);
			})
		}
		else
		{
			this.addNewResponseField(elButtonAddNewOption);
		}

		elButtonAddNewOption.addEventListener("click", this.addNewResponseField.bind(this, elButtonAddNewOption, null));
	}
	
	
	addNewResponseField(elButtonAddNewOption, strPresetValue = null)
	{
		const elInputNewResponseField = document.createElement("input");
		elInputNewResponseField.className = "form-control responses";
		elInputNewResponseField.placeholder = "Write the new reponse";
		elInputNewResponseField.type = "text";

		if(strPresetValue != null)
		{
			elInputNewResponseField.value = strPresetValue;
		}

		this._elDivContainer.insertBefore(elInputNewResponseField, elButtonAddNewOption);
	}
}

export {Responses};