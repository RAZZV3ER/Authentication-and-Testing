const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    cost: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
