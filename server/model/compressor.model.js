const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let compressorSchema = new Schema({
    originalName: {
        type: String,
        required: true
    },
    originalSize: {
        type: String,
        required: true
    },
    originalFileType: {
        type: String,
        required: true
    },
    uploadName: {
        type: String
    },
    originalURL: {
        type: String
    },
    compressedURL: {
        type: String
    },
    s3BucketURL: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, {
    collection: 'compressor'
})

module.exports = mongoose.model('CompressorSchema', compressorSchema)