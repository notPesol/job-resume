const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

const { MONGO_USERNAME, MONGO_PASSWORD, CLOUD_NAME, CLOUD_API_KEY, CLOUD_SECRET } = require('./config');

module.exports.connectDatabase = () => {
  mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.dshvc.mongodb.net/jobResume?retryWrites=true&w=majority`)
    .then(_ => console.log("Database connected."))
    .catch(err => console.error("Database can't connect", err));
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_SECRET
});

module.exports.cloudinary = cloudinary;