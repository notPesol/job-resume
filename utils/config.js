require('dotenv').config();

module.exports.MONGO_USERNAME = process.env.MONGO_USERNAME;
module.exports.MONGO_PASSWORD = process.env.MONGO_PASSWORD;

module.exports.CLOUD_NAME = process.env.CLOUD_NAME;
module.exports.CLOUD_API_KEY = process.env.CLOUD_API_KEY;
module.exports.CLOUD_SECRET = process.env.CLOUD_SECRET;

module.exports.ADMIN_USERNAME = process.env.ADMIN_USERNAME;
module.exports.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;