const mongoose = require('mongoose')

// skema som beskriver haveservice
const haveserviceSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, 'Navn er påkrævet']
  },
  content: {
    type: String,
    required: [true, 'tekst er påkrævet']
  },
  image: {
    type: String,
    required: [true, 'Foto er påkrævet']
  }
})


module.exports = mongoose.model('Haveservice', haveserviceSchema, 'haveservice')