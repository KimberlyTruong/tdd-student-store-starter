const dbData = require("./../data/db.json")
const fs = require("fs")


class Store {

    static listAllProducts() {
        return {products: dbData.products}
    }

    static fetchProduct(productId) {
        return {product: dbData.products[productId - 1]}
    }
    static newPurchaseOrder(order, user) {
        //throw 404 error if there's a duplicate in order

        // just check id for every object in the shopping list.
        // can we use set here?

        var receiptLines = [`Success! Showing receipt for ${user.name} available at ${user.email}:`]

        var subtotal = 0
        var productDetails
        order.forEach ((product) => {
            productDetails = this.fetchProduct(product.itemId).product
            subtotal += productDetails.price
            receiptLines.push(`${product.quantity} ${productDetails.name} purchases at a cost of $${(product.quantity * productDetails.price).toFixed(2)}.`)
        })

        const tax = 0.0875
        const total = subtotal * (1 + tax)

        var today = new Date()

        receiptLines.push(`Before taxes, the subtotal was $${subtotal.toFixed(2)} After taxes and fees were applied, the total comes out to $${total.toFixed(2)}`)

        const purchase = {
            id: dbData.purchases.length + 1,
            name: user.name,
            email: user.email,
            order: order,
            total: total.toFixed(2),
            createdAt: today.toLocaleDateString() + ' ' + today.toLocaleTimeString(),
            receipt: receiptLines
        }

        // add to the database
        dbData.purchases.push(purchase)
        const dbDataJson = JSON.stringify(dbData, null, 4)
        fs.writeFileSync("./data/db.json", dbDataJson, "utf-8")




        return ({purchase: purchase})
    }
}

module.exports = Store
