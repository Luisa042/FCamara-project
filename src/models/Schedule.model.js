const { Schema, model } = require('mongoose');

const scheduleSchema = new Schema({
    
},
{
    timestamps: true
}
);

module.exports = model('Schedule', scheduleSchema);