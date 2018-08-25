'use strict';

class ComponentBase
{
    constructor(elDivContainer = null)
    {
        this._birthday = null;
        this._responses = null;
        this._exceptions = null;
        this._stoped = null;
    }
    

    render()
    {
        throw new Error("Must be implmented!");
    }


    setRenderingValues(objData)
    {
        this._birthday = objData.birthday;
        this._responses = objData.responses;
        this._exceptions = objData.exceptions;
        this._stoped = objData.stoped;
    }


    static instance(elDivContainer = null)
    {
        if(this._instance && elDivContainer === null)
        {
            return this._instance;
        }

        if(!this._instance && elDivContainer === null)
        {
            this._instance = new this();
            return this._instance;

        }

        if(!(elDivContainer instanceof HTMLElement))
        {
            throw new Error("Argument must be a DOM Element");
        }

        if(this._instance && elDivContainer)
        {
            this._instance._elDivContainer = elDivContainer;
            return this._instance;
        }

        this._instance = new this(elDivContainer);
        this._instance._elDivContainer = elDivContainer;

        return this._instance;
    }
}

export {ComponentBase};