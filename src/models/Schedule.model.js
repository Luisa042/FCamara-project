const { Schema, model } = require('mongoose');

const scheduleSchema = new Schema({
    local: {
        address: {
            city: 'String',
            UF: 'String',
            required: true
        },
        geolocation: {
            type: 'String',
            coordinates: 'Array'
        }
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