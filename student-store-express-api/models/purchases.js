const dbData = require("./../data/db.json")

class Purchases {
    static listAllPurchases () {
        return ({purchases: dbData.purchases})
    }

    static getPurchase (purchaseId) {
        if (purchaseId > dbData.purchases.length){
            return null
        }
        return ({purchase: dbData.purchases[purchaseId - 1]})
    }
}

module.exports = Purchases
