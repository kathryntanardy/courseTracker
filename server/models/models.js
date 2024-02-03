const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

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
        required: false
    }

});

const courseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    assignments: [{
        type: [itemSchema],
        required: true
    }],
    credits: {
        type: Number,
        required: true,
        validator: Number.isInteger
    }
});

module.exports = mongoose.model('Item', itemSchema);
module.exports = mongoose.model('Course', courseSchema);