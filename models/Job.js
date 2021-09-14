const mongoose = require('mongoose');
const { Schema } = mongoose;

// Application Model
const Application = require('./Application');

// Cloudinary
const { cloudinary } = require('../utils/helper');

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

jobSchema.post('findOneAndDelete', async function (res) {
  if (res) {
    const apps = await Application.find({ job: res._id });
    if (apps.length > 0) {
      for (const app of apps) {
        await cloudinary.uploader.destroy(app.resumeFile);
      }
      await Application.deleteMany({ job: res._id });
    }
  }
});

module.exports = mongoose.model('Job', jobSchema);