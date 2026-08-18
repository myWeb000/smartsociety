const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config(); // Ensure dotenv is loaded to read ATLASDB

dns.setServers(['1.1.1.1', '8.8.8.8']);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ATLASDB);
        console.log('DB Connected via Atlas');
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

module.exports = connectDB;