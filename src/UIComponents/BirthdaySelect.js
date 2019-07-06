'use strict';

import ComponentBase from "./ComponentBase.js";

class BirthdaySelect extends ComponentBase
{
	constructor(elDivContainer = null)
	{
		super(elDivContainer);

		this._datePicker = null;
	}


	render()
	{
		this._elDivContainer.classList.add("mx-auto");
		this._elDivContainer.appendChild(document.createTextNode("Select your birthday: "))

		const elDivDateSelectorContainer = document.createElement("input");
		elDivDateSelectorContainer.id = "datepicker";
		elDivDateSelectorContainer.classList.add("form-control");
		this._elDivContainer.appendChild(elDivDateSelectorContainer);

		this._datePicker = new Pikaday({
			field: elDivDateSelectorContainer,
			format: 'D/M/YYYY',
			toString(date, format) {
				const day = date.getDate();
				const month = date.getMonth() + 1;
				const year = date.getFullYear();
				return `${day}/${month}/${year}`;
			},
			parse(dateString, format) {
				// dateString is the result of `toString` method
				const parts = dateString.split('/');
				const day = parseInt(parts[0], 10);
				const month = parseInt(parts[1] - 1, 10);
				const year = parseInt(parts[1], 10);
				return new Date(year, month, day);
			},
		    onSelect(date) {
		    	console.log(this.toString());
			},
		})

		const arrDate = this._birthday.split("/");
		this._datePicker.setDate([arrDate[1], arrDate[0], arrDate[2]].join("/")); //Date default format(M/D/Y)
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

export default BirthdaySelect;
