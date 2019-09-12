const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String
  },
  quotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quote'
  }]
});

// characterSchema.set('toObject', {
//   transform: function(doc, ret, options) {
//     let returnJson = {
//       _id: ret._id,
//       name: ret.name,
//       quotes: ret.quotes
//     }
//     return returnJson;
//   }
// })

module.exports = mongoose.model('Character', characterSchema);