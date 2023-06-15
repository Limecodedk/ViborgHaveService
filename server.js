const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT

// ---- DB Mongo og Mongooe 
//------------------------------

const mongoose = require('mongoose')
/* mongoose.connect(process.env.DB_Url, { useNewUrlParser: true, useUnifiedTopology: true }) */
mongoose.connect(process.env.Atlas_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', (error) => console.log("FEJL" + error))
db.once('open', () => console.log("///---> Så er der hul igennem til databasen"))

//APP
//--------------------------------
app.use(cors())
app.use(express.static('public')) //Adgang til statisk fil udefra sendes ind i public mappen
app.use(express.json()) //Håndter POST/PUT/PATCH hvor data er json
app.use(express.urlencoded({ extended: true })) //Håndter POST/PUT/PATCH hvor data URLencoded


//Må ikke ligge her mere da den konflikter med Multer. Er flyttet til todos.routes.js
/* const formData = require('express-form-data')//Håndter POST/PUT/PATCH hvor data Multioartfom
app.use(formData.parse()) */

// ---- Get serverens enspoint: http://localhost:5000
app.get('/', async (req, res) => {

  console.log('Der var et request til serverens endpoint')

  res.status(200).json({ message: "Velkommen til min server start-endpoint" })

})

//---ROUTES
//------------------------
app.use('/haveservice', require('./routes/haveservice.routes')) //endpoint todos

//No MATCH
//------
app.get('*', async (req, res) => {
  res.status(404).json({ message: "Siden findes ikke" })
})

// --- LISTEN - opstart server
//-------------------------------
app.listen(PORT, () => console.log("///---> Her er din server som lytter på port:" + PORT))

