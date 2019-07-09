const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  charter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Charter'
  },
  startTime: {
    type: Date
  },
  assignee: {
    type: String,
    trim: true
  },
  endTime: {
    type: Date,
    default: Date.now
  },
  t: Number,
  b: Number,
  s: Number,
  opportunity: Number,
  bugs: Number,
  issues: Number,
  notes: String,
  debriefNotes: String
});

module.exports = mongoose.model('Session', sessionSchema);