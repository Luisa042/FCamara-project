const { Schema, model } = require('mongoose');

const localSchema = new Schema ({
    name: {
        type: 'String',
        required: true
    },
    address: {
        city: 'String',
        UF: 'String',
        required: true
    },
    geo: {
        type: 'String',
        coordinates: 'Array'
    }
},
{
    timestamps: true
}
);

module.exports = model('Local', localSchema);