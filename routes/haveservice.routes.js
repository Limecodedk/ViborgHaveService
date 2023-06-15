const express = require('express');
const router = express.Router();

//Modellen for en haveservice
const Haveservice = require('../models/haveservice.models')

//----Multer til upload af filer/billeder
//---------------------------------------
const multer = require('multer')

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      //cb(null, file.originalname)
      cb(null, Date.now() + "-" + file.originalname)
    }
  })
})

//-------GET - ALLE-------
router.get('/', async (req, res) => {

  console.log('Haveservice GET ALL')

  try {

    let haveservice = await Haveservice.find()
    return res.status(200).json({ haveservice })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
  }

})

//-------GET - En specifik ID-------
router.get('/:id', async (req, res) => {

  console.log('haveservice GET BY ID')

  try {
    let haveservice = await haveservice.findById(req.params.id)
    return res.status(200).json({ Records: haveservice })
  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
  }
})

//-------POST --------
router.post('/', upload.single('image'), async (req, res) => {

  console.log('haveservice POST', req.body)

  try {
    let haveservice = new Haveservice(req.body) //gør en ny haveservice klar med data fra requests body
    haveservice.image = req.file.filename //Tilføj images filename til den nye haveservice

    await haveservice.save() //Gem haveservice i db

    return res.status(201).json({ message: "Ny haveservice er oprettet", created: haveservice })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })

  }
})

//-------PUT--------
router.put('/:id', upload.single('image'), async (req, res) => {

  console.log("Haveservice GET", req.body)

  try {

    //Hvis der kommer en fil med i requestet = billedet skal rettet (og ellers ikke)
    if (req.file) {
      req.body.image = req.file.filename
    }

    let haveservice = await Haveservice.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    if (haveservice === null) {
      return res.status(404).json({ message: "haveservice kunne ikke findes og rettets" })
    }

    return res.status(200).json({ message: "haveservice er opdateret", updated: haveservice })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
  }
})

//-------DELETE --------
router.delete('/:id', async (req, res) => {

  console.log('DELETE BY ID')

  try {

    let haveservice = await haveservice.findByIdAndDelete(req.params.id)

    if (haveservice === null) {
      return res.status(404).json({ message: "haveservice kunne ikke findes og rettets" })
    }
    return res.status(200).json({ haveservice })

  } catch (error) {

    return res.status(400).json({ message: "Der er sket en fejl: " + error.message })
  }
})

//HUSK !!!
module.exports = router;
