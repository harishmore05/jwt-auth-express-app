const express = require('express')
const app = express()
const port = 3000


var cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

require('dotenv').config();
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})
.then(() => {
    console.log('Connected to mongodb');
})
.catch( err => {
    console.log("Error occured while connecting to the Database: "+err)
})

require('./routers/user.route')(app)


app.get('/', (req, res)=> {
    res.send("Welcome JWT Authentication demo using express..")
})



app.listen(port, ()=> {
    console.log('Server is up and running port: '+port)
})