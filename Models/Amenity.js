const mongoose = require('mongoose');

const amenitySchema = new mongoose.Schema({
    resident_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amenity_name: { type: String, required: true },
    booking_date: { type: Date, required: true }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Amenity', amenitySchema, 'amenities');
