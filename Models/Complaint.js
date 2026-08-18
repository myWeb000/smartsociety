const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    resident_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image_url: { type: String },
    status: { type: String, enum: ['Pending', 'In-Progress', 'Resolved'], default: 'Pending' }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Complaint', complaintSchema, 'complaints');
