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

		this.addNewResponseField(elButtonAddNewOption);
		elButtonAddNewOption.addEventListener("click", this.addNewResponseField.bind(this, elButtonAddNewOption));
	}
	
	
	addNewResponseField(elButtonAddNewOption)
	{
		const elInputNewResponseField = document.createElement("input");
		elInputNewResponseField.className = "form-control responses";
		elInputNewResponseField.placeholder = "New response";
		elInputNewResponseField.type = "text";

		this._elDivContainer.insertBefore(elInputNewResponseField, elButtonAddNewOption);
	}
}

export {Responses};