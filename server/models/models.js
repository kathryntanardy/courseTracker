const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true,
        validator: Number.isInteger
    },
    grade: {
        type: Number,
        required: true
    },
    progress: {
        type: Number,
        required: true
    },
    colour: {
        type: Object,
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
            },
            progress: {
                type: Number,
                required: true
            },
            subItems: {
                type: [{
                    name: {
                        type: String,
                        required: true
                    },
                    weight: {
                        type: Number,
                        required: true
                    },
                    totalMarks: {
                        type: Number,
                        required: true
                    },
                    marksGiven: {
                        type: Number,
                        required: true
                    }
                }],
                required: true
            }
        }],
        required: true
    },
});

module.exports = mongoose.model('Course', courseSchema);