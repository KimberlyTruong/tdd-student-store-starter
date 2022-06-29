const express = require("express")
const purchasesModel = require("./../models/purchases")
const router = express.Router()
const bodyParser = require('body-parser')


router.use(bodyParser.json())

router.get('/', (req, res) => {
    res.status(200).send(purchasesModel.listAllPurchases())
})

router.get('/:purchaseId', (req, res) => {
    const purchase = purchasesModel.getPurchase(req.params.purchaseId)

    if (purchase)
        res.status(200).send(purchasesModel.getPurchase(req.params.purchaseId))
        
    res.status(400).send("ERROR: invalid purchase ID. No purchase found.")
})

module.exports = router
