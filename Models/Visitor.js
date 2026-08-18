const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    flat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Flat' },
    visitor_name: { type: String, required: true },
    phone: { type: String, required: true },
    vehicle_number: { type: String },
    gate_pass_code: { type: String }, // Used for expected guests
    status: { type: String, enum: ['Pending', 'Entered', 'Exited'], default: 'Pending' },
    type: { type: String, enum: ['Expected', 'Walk-In'], required: true }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Visitor', visitorSchema, 'visitors');
