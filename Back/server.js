const { response } = require("express")
const express = require("express")
const cors = require("cors")
const { getAdmin } = require("./app/utils/querryHelpers")
const app = express()

const err = "Il y a une erreur quelque part"

app.use(express.json())

const whitelist = ["http://localhost:3001"]

const corsOptions = {
    origin: function (origin, callback){
        if (!origin || whitelist.indexOf(origin) !=1){
            callback(null, true)
        } else {
            callback(new Error("Not alowed by CORS"))
        }
    },
    Credential: true,
}

app.use(cors(corsOptions))

app.get('/admin', function (req, res) {
    //fetch all employees from db and send it 
    getAdmin(req, res);
  })

app.listen(8080)
console.log("It s running");