const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  charter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Charter'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  assignee: {
    type: String,
    trim: true
  },
  finalTime: {
    type: Date
  },
  t: Number,
  b: Number,
  s: Number,
  oportunity: Number,
  bugs: Number,
  issues: Number,
  debriefed: {
    type: Boolean,
    default: false
  },

});

module.exports = mongoose.model('Session', sessionSchema);