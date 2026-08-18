const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema({
    block_name: { type: String, required: true },
    flat_number: { type: String, required: true },
    resident_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Flat', flatSchema, 'flats');
