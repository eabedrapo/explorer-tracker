const mongoose = require('mongoose');

const charterSchema = new mongoose.Schema({
  charter: {
    type: String,
    trim: true,
  },
  asignee: {
    type: String,
    trim: true,
  },
  description: String,
  sessions: [String]
});

module.exports = mongoose.model('Charter', charterSchema);