const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  resumeFile: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Application", applicationSchema);