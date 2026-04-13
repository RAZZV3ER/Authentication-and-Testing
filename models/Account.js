const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    passKey: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);
