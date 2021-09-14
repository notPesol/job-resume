const mongoose = require('mongoose');
const { Schema } = mongoose;

const { cloudinary } = require('../utils/helper');

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

applicationSchema.post('findOneAndDelete', async (res) => {
  if (res) {
    // delete in cloudinary
    await cloudinary.uploader.destroy(res.resumeFile);
  }
})

module.exports = mongoose.model("Application", applicationSchema);