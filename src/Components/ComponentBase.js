'use strict';

class ComponentBase
{
    constructor(elDivContainer = null)
    {
        this._elDivContainer = elDivContainer;
        this.constructor._instance = this;
    }
    

    render()
    {
        throw new Error("Must be implmented!");
    }


    static instance(elDivContainer = null)
    {
        if(this._instance && elDivContainer === null)
        {
            return this._instance;
        }

        if(!(elDivContainer instanceof HTMLElement))
        {
            throw new Error("Argument must be a DOM Element");
        }

        this._elDivContainer = elDivContainer;
        this._instance = new this(elDivContainer);

        return this._instance;
    }
}

export {ComponentBase};