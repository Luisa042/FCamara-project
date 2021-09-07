const { Schema, model } = require('mongoose');

const localSchema = new Schema ({

},
{
    timestamps: true
}
);

module.exports = model('Local', localSchema);