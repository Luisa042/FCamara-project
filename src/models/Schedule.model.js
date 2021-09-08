const { Schema, model } = require('mongoose');

const scheduleSchema = new Schema({
    localId: {
        type: Schema.Types.ObjectId,
        ref: 'Local',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true,
        status: {
            type: 'String',
            enum: ['disponível', 'indisponível'],
            default: 'disponível',
            required: true
        }
    },
},
    {
        timestamps: true
    }
);

module.exports = model('Schedule', scheduleSchema);