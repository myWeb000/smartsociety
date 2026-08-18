const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    flat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Flat', required: true },
    amount_due: { type: Number, required: true },
    due_date: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Bill', billSchema, 'bills');
