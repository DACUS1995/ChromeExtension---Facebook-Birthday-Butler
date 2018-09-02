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
    }

    registerNotificationEvents()
    {
        console.log("Notification events registered");
    }

    stopNotificationEvents()
    {
        console.log("Notification events stoped");
    }

    
}

export default BdayNotificationHandler;
