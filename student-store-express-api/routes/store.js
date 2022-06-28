const express = require("express")
const storeModel = require("./../models/store")
const router = express.Router()
const bodyParser = require('body-parser')


router.use(bodyParser.json())

router.get('/', (req, res) => {
    res.status(200).send(storeModel.listAllProducts())
})

router.post('/', (req, res) => {
    try {
        const order = req.body.shoppingCart //array of objects (product id and quantity)
        const user = req.body.user // object (name and email)

        // Confirm there is no duplicate item (itemId) in the shopping cart.
        // If there is, send a 400 error.
        for (let i = 0; i < order.length; i++){
            for (let j = i+1; j < order.length; j++){
                if (order[i].itemId === order[j].itemId){
                    res.status(400).send("ERROR: there are duplicate products in the shopping cart.")
                }
            }
        }

        // verify there is no data missing in the shopping cart
        order.forEach ((item) => {
            if (!("itemId" in item) || !item.itemId || !("quantity" in item) || !item.quantity){
                res.status(400).send("ERROR: missing quanity or item ID in shopping cart.")
            }
        })

        res.status(201).send(storeModel.newPurchaseOrder(order, user))
    }
    catch (err){
        console.log(err)
        res.status(404).send("ERROR: a required field is missing.") // in the README it says to send a 400 error, but in the codepath project doc it says to throw a 404 error???
    }

})

router.get('/:productId', (req, res) => {
    const productId = parseInt(req.params.productId)

    res.status(200).send(storeModel.fetchProduct(productId))
})

module.exports = router
