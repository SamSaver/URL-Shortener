const mongoose = require('mongoose')


const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    expireAt: {
        type: Date,
        required: true,
        index: { expireAfterSeconds: 0}
    }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)