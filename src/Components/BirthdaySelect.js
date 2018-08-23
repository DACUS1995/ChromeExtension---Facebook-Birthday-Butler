'use strict';

import {ComponentBase} from "./ComponentBase.js";

class BirthdaySelect extends ComponentBase
{
	constructor(elDivContainer = null)
	{
		super(elDivContainer);

		this._datePicker = null;
	}

	render()
	{
		this._elDivContainer.appendChild(document.createTextNode("Select your birthday: "))

		const elDivDateSelectorContainer = document.createElement("input");
		elDivDateSelectorContainer.id = "datepicker";
		elDivDateSelectorContainer.classList.add("form-control");
		this._elDivContainer.appendChild(elDivDateSelectorContainer);

		this._datePicker = new Pikaday({
			field: elDivDateSelectorContainer,
			toString(date, format) {
				const day = date.getDate();
				const month = date.getMonth() + 1;
				const year = date.getFullYear();
				return `${day}/${month}/${year}`;
			},
		    onSelect(date) {
		    	console.log(this.toString());
		    }
		})
	}

	get datePicker()
	{
		if(this._datePicker === null)
		{
			throw new Error("Date picker not initialized");
		}

		return this._datePicker;
	}
}

export {BirthdaySelect};
