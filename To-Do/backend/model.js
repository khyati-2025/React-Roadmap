const mongoose = require('mongoose');

const toDoSchema = mongoose.Schema({
    queue_id: Number,
    title: {
        type: String,
        required: true,
        maxLength: 20
    },
    description: {
        type: String,
        maxLength: 100
    },
    status: {
        type: String,
        enum: ['pending', 'inProgress', 'done'],
        default: 'pending',
        required: true
    },
    priority: {
        type: String,
        enum: {
            values: ['low', 'medium', 'high'],
            message: 'Priority must be one of low, medium, high'
        }
    },
    dueDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('toDo', toDoSchema);