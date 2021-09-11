const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  position: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  detail: {
    type: String,
    required: true,
  },
  qualifications: {
    type: [String],
    required: true
  },
  datePost: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);