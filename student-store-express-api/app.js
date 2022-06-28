// YOUR CODE HERE
const morgan = require('morgan')
const express = require ('express')
const store = require('./routes/store')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())


app.use(morgan('tiny'))
app.use('/store', store)

app.use(express.json())
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.status(200).send({ "ping": "pong" })
})


module.exports = app
