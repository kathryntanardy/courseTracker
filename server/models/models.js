const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    items: {
        type: [{
            name: {
                type: String,
                required: true
            },
            weight: {
                type: Number,
                required: true
            },
            grade: {
                type: Number,
                required: true
            }
        }],
        required: true
    },
    credits: {
        type: Number,
        required: true,
        validator: Number.isInteger
    }
});

module.exports = mongoose.model('Course', courseSchema);