const mongoose = require('mongoose');

const charterSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  charter: {
    type: String,
    trim: true,
    required: true
  },
  assignee: {
    type: String,
    trim: true,
  },
  description:  {
    type: String,
    required: true,
  },
  sessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
      }
   ]
});

module.exports = mongoose.model('Charter', charterSchema);