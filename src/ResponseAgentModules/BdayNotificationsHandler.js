class BdayNotificationHandler
{
    constructor()
    {
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
