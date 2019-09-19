const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String
  },
  quote: {
    type: String
  }
  // quotes: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Quote'
  // }]
});

module.exports = mongoose.model('Character', characterSchema);